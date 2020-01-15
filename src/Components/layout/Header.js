import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Header = (props) => {

    const { branding } = props; // deconstruction => taking 'branding'value out of props
    return (
        <nav className="navbar navbar-expand-sm 
        navbar-dark bg-danger mb-3 py-0">
            <div className="container">
                <Link to="/" className="navbar-brand">{branding}</Link>
            </div>
            <div>
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <i className="fas fa-home"/>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/contact/add" className="nav-link">
                    <i className="fas fa-plus"/>Add</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/about" className="nav-link">
                    <i className="fas fa-question"/>About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

Header.defaultProps = {
    branding: 'deafult branding value'
};

// validates if correct types are used for properties and outputs it to console if not
// doesn't crash the app...
Header.propTypes = {
    branding: PropTypes.string.isRequired
};

// const headingStyle = {
//     color: 'red', 
//     fontSize: '50px'
// }

export default Header;
