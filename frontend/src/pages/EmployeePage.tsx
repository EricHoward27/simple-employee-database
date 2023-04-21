import { Container } from "react-bootstrap";
import styles from '../style/employee.module.css';
import EmployeePageLoggedInView from "../components/EmployeePageLoggedInView";
import EmployeePageLoggedOutView from "../components/EmployeePageLoggedOutView";
import { User } from "../models/users";

interface EmployeePageProps {
    loggedInUser: User | null,
}
const EmployeePage = ({loggedInUser}: EmployeePageProps) => {
    return ( 
        <Container fluid className={styles.employeePage}>
        <>
        {loggedInUser
          ? <EmployeePageLoggedInView />
          : <EmployeePageLoggedOutView />
        }
        </>
        </Container>
     );
}
 
export default EmployeePage;