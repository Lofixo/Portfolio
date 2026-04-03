import React from "react"

interface NavbarButtonProps {
    label: string
    onClick: () => void
}

export const NavbarButton: React.FunctionComponent<NavbarButtonProps> = (props) => {
    return (
        <div className="navbar-button-container">
            <button className="navbar-button-container__content" onClick={props.onClick}>
                {props.label}
            </button>
        </div>
    )
}
