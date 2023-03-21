const asyncHandler = require('express-async-handler');
const controller = {}

/**
 * @route GET /api/contacts
 * @desc Get all users contacts
 * @access Private
 */
controller.getContacts = asyncHandler(async (req,res) => {
  res.json({message: 'Get all contacts'})
});

/**
 * @route POST /api/contacts
 * @desc Add new contact
 * @access Private
 */
controller.setContact = asyncHandler(async (req,res) => {
  // console.log(req.body.name);
  if (!req.body.name) {
    res.status(400);
    throw new Error('name is required')
  }
  res.json({message: 'Create new contact'})
});

/**
 * @route PUT /api/contacts/:id
 * @desc Update contact
 * @access Private
 */
controller.updateContact = asyncHandler(async (req,res) => {
  res.json({message: `Contact ${req.params.id} updated` })
});

/**
 * @route DELETE /api/contacts/:id
 * @desc Delete contact
 * @access Private
 */
controller.deleteContact = asyncHandler(async (req,res) => {
  res.json({message: `Contact ${req.params.id} deleted` })
});

// Export module
module.exports = controller