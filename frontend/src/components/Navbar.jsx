import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import {logout, reset} from '../features/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success('Logged out successfully');
    navigate('/')
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3 border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Contacts
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <button className="btn btn-primary" onClick={onLogout}> <FaSignOutAlt />Logout</button>
            </li>
          ) : (
            <>
            <li className="nav-item">
            <Link className='nav-link' to="/register">
              <FaUser /> Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          </>
          )}
        </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar