import { Navbar, Button } from "react-bootstrap";
import styles from "../style/NavBar.module.css"
interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}


const NavBarLoggedOutView = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutViewProps) => {

    return ( 
        <>
        <Button onClick={onSignUpClicked} variant="dark" className={styles.signUpButton}>Sign Up</Button>
        <Button onClick={onLoginClicked} variant="dark" className={styles.loginButton}>Log In</Button>
        
        </>
     );
}
 
export default NavBarLoggedOutView;