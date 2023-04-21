import { User } from "../models/users";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "../style/NavBar.module.css";
import NavBarLoggInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom"

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    return ( 
        <div className="row">
            <div className="col">
                <Navbar className={styles.navbar}  expand="md" sticky="top">
                    <Container>
                        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
                            Simple Employee Database
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="main-navbar" className={styles.navbarToggle}/>
                        <Navbar.Collapse id="main-navbar" className={styles.navbarCollapse}>
                            <Nav className={`mr-auto ${styles.navbarNav}`}>
                                <Nav.Link as={Link} to="/privacy" className={styles.navbarLink}>
                                    Privacy
                                </Nav.Link>
                            </Nav>
                            <Nav className="ms-auto">
                                { loggedInUser
                                    ? <NavBarLoggInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                                    : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
     );
}
 
export default NavBar;
