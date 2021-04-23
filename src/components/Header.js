import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, addFormToggle, formToggle }) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === "/" && (
                <Button
                    color={formToggle ? "red" : "green"}
                    text={formToggle ? "Close" : "Add"}
                    onClick={addFormToggle}
                />
            )}
        </header>
    );
};

Header.defaultProps = {
    title: "Task Manager",
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
