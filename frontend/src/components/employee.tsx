import styles from "../style/employee.module.css";
import { Employee as EmployeeModel } from "../models/employee";
import { Table } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import { BsDashCircleFill, BsDashCircle } from "react-icons/bs"

interface EmployeeProps {
  employees: EmployeeModel[];
  onEmployeeClicked: (employee: EmployeeModel) => void,
  /**create onclick handler for delete icon to remove table row data when clicked */
  onDeleteEmployeeClicked: (employee: EmployeeModel) => void,
}

const Employee = ({ employees, onDeleteEmployeeClicked, onEmployeeClicked }: EmployeeProps) => {
  /* set var createdUpdatedText in a condition if updated value is larger display the text else use create format date */
  const createdUpdatedText = (createdAt: string, updatedAt: string) => {
    if (updatedAt > createdAt) {
      return "Updated: " + formatDate(updatedAt);
    } else {
      return "Created " + formatDate(createdAt);
    }
  };

  return (
    <>
      <Table className={styles.employeeTable}>
        <thead className={styles.employeeTableHeader}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Birthday</th>
            <th>Location</th>
            <th>Home Address</th>
            <th>Hired on</th>
            <th>Hours</th>
            <th>Employee Created At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.employeeTableBody}>
          {employees.map((employee, index) => (
            <tr className={styles.employeeTableRow} key={employee._id}
            onClick={() => onEmployeeClicked(employee)}
            >
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.birthday}</td>
              <td>{employee.location}</td>
              <td>{employee.homeAddress}</td>
              <td>{employee.hireOn}</td>
              <td>{employee.hours}</td>
              <td>{createdUpdatedText(employee.createdAt, employee.updatedAt)}</td>
              <td><BsDashCircle className={styles.employeeTableDeleteButton}
              onClick={(e) => {
                onDeleteEmployeeClicked(employee);
                e.stopPropagation();
              }}
              /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Employee;

