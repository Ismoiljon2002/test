import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigate = () => {

    const [ activeLink, setActiveLink ] = useState(1)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="">
                    TEST GAMES
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" 
                            onClick={() => setActiveLink(1)} 
                            className={activeLink === 1 ? 'nav-link active' : 'nav-link'}
                        > Game 1</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/game2" 
                            onClick={() => setActiveLink(2)} 
                            className={activeLink === 2 ? 'nav-link active' : 'nav-link'}
                        > Game 2</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigate;