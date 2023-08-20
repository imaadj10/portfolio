// @ts-nocheck
function Navbar(props) {
    return (
        <div>
            <ul {...props}>
                <li style={{float: "left", color: "white"}}>Home</li>
                <li style={{float: "left", color: "white"}}>Projects</li>
                <li style={{float: "left", color: "white"}}>About Me</li>
                <li style={{float: "left", color: "white"}}>Contact</li>
            </ul>
        </div>
    );
}

export default Navbar;