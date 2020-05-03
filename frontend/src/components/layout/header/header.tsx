import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import "./header.css";

interface Props {
    readonly siteTitle: string
    readonly description?: string
}

const Header = ({ siteTitle }: Props) => (
    <header className="header-wrapper">
        <nav className="nav-wrapper">
            <ul>
                <li className="home-link">
                    <Link to="/home"><h1>{siteTitle}</h1></Link>
                </li>
                <li className="events-link">
                    <Link to="/events"><h5>Photos par évènements</h5></Link>
                </li>
                <li className="events-link">
                    <Link to="/years"><h5>Photos par années</h5></Link>
                </li>
            </ul>
        </nav>
    </header>
)

Header.defaultProps = {
    siteTitle: `Souvenirs`,
}

export default Header;