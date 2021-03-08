import React from 'react'
import PropTypes from 'prop-types'


const Navbar = ({icon,title}) => {
        return (
            <nav className='navbar bg-primary'>
                <h1>
                    <i className={icon} aria-hidden="true"></i>
                    {title}
                </h1>
            </nav>
        )
}

Navbar.defaultProps = {
    title:'Tassos Github',
    icon:'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
