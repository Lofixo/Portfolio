import React from "react"
import { NavbarButton } from "./NavbarButton"

export const Navbar: React.FunctionComponent = () => {
    return (
        <div className="navbar">
            <img className="navbar__personal-logo" src="/src/assets/personal-logo.png" alt="Logo" />
            <div className="navbar__buttons">
                <NavbarButton label="Home" onClick={() => console.log("Home clicked")} />
                <div className="navbar__buttons__divider" />
                <NavbarButton label="About" onClick={() => console.log("About clicked")} />
                <div className="navbar__buttons__divider" />
                <NavbarButton label="Experience" onClick={() => console.log("Experience clicked")} />
                <div className="navbar__buttons__divider" />
                <NavbarButton label="Projects" onClick={() => console.log("Projects clicked")} />
                <div className="navbar__buttons__divider" />
                <NavbarButton label="Contact" onClick={() => console.log("Contact clicked")} />
            </div>
            <div className="navbar__translate-icon" />
        </div>
    )
}
