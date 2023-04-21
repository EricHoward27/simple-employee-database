import { Navbar, Button } from "react-bootstrap";
import { User } from "../models/users";
import * as EmployeesApi from "../network/employees_api";
import styles from "../style/NavBar.module.css"


interface NavBarLoggInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}



const NavBarLoggInView = ({user, onLogoutSuccessful}: NavBarLoggInViewProps) => {
    async function logout(){
        try {
            await EmployeesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }
    
    return ( 
        <>
        <Navbar.Text className={`me-2 ${styles.navbarText}`}>
            Signed In as: {user.username}
        </Navbar.Text>
        <Button onClick={logout} className={styles.logoutButton}>Log out</Button>
        
        </>
     );
}
 
export default NavBarLoggInView;