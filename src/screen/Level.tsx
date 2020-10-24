import React from 'react'
import {Link} from 'react-router-dom';

export default function Level() {
    return (
        <ul>
            <li><Link to="/beginner"> Beginner</Link></li>
            <li><Link to="/intermediate">Intermediate</Link></li>
            <li><Link to="/hard">Hard</Link></li>
        </ul>
    );
}