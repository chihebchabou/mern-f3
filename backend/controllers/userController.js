const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const controller = {}

/**
 * @route POST api/users
 * @desc Register new user
 * @access Public
 */
controller.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map(error => error.msg).join('\n'));
  }

  const {name, email, password} = req.body;

  // Check if user exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  console.log("salt:",salt);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({name, email, password: hashedPassword});

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @route POST api/users/login
 * @desc Authenticate new user
 * @access Public
 */
controller.loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  // Check if user exists
  const user = await User.findOne({email});

  if (user && await bcrypt.compare(typeof password === 'undefined' ? '' : password, user.password)) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid crendentials');
  }
});

/**
 * @route GET api/users/me
 * @desc Get user data
 * @access Private
 */
controller.getMe = asyncHandler(async (req, res) => {
  console.log(req.user.name);
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})

module.exports = controller;