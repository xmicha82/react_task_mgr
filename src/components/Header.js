import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, addFormToggle, formToggle }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button
                color={formToggle ? "red" : "green"}
                text={formToggle ? "Close" : "Add"}
                onClick={addFormToggle}
            />
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
