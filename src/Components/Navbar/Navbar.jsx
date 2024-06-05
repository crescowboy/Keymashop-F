import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
// import nav_dropdown from '../Assets/dropdown_icon.png';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [user, setUser] = useState(null);
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                localStorage.removeItem('user'); // Remove invalid user data from localStorage
            }
        }
    }, []);

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.replace('/');
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='logo' />
                <p>SHOPPER</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className='nav-dropdown' onClick={dropdown_toggle} />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : null}</li>
            </ul>
            <div className="nav-login-cart">
                {user 
                    ? (
                        user.imageUrl 
                        ? (
                            <div className="nav-user-info">
                                <img src={user.imageUrl} alt="Profile" className="nav-profile-pic" />
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )
                        : (
                            <div className="nav-user-info">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )
                    )
                    : (
                        <Link to='/login'><button>Login</button></Link>
                    )
                }
                <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
