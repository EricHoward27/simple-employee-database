import * as EmployeeApi from "../network/employees_api";
import CreateEmployee from "./createEmployee";
import UpdateEmployee from "./updateEmployee";
import { BsPlusLg } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Spinner } from 'react-bootstrap';
import { Employee as EmployeeModel } from '../models/employee';
import Employee from '../components/employee';
import styleUtils from "../style/utils.module.css"
import styles from '../style/employee.module.css';

const EmployeePageLoggedInView = () => {

    const [employees, setEmployee] = useState<EmployeeModel[]>([]);
    const [employeeLoading, setEmployeeLoading] = useState(true);
    const [showEmployeeLoadingError, setShowEmployeeLoadingError] = useState(false);
    const [showCreateEmployee, setShowCreateEmployee] = useState(false);//init state for employee   
    const [employeeToEdit, setEmployeeToEdit] = useState<EmployeeModel|null>(null);

    useEffect(() => {
        async function loadEmployee() {
          try {
            setShowEmployeeLoadingError(false);
            setEmployeeLoading(true);
            const employees = await EmployeeApi.fetchEmployees();
            setEmployee(employees)
          } catch (error) {
            console.error(error);
            alert(error);
            setShowEmployeeLoadingError(true);
          } finally {
            setEmployeeLoading(false);
          }
          
        }
        loadEmployee();
      }, []);
    /**deletes the employee from api and filters the existing employees to remove the deleted employee from the state by setting the new state; if error occurs during delete it will log to console and alert user */
      async function deleteEmployee(employee: EmployeeModel) {
        try {
          await EmployeeApi.deleteEmployee(employee._id);
          setEmployee(employees.filter(existingEmployee => existingEmployee._id !== employee._id))
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
    
      const employeeGrid =
      <Row xs={1} md={2} xl={3} className={styles.employeeGrid}>
            <Employee 
            employees={employees} 
            onEmployeeClicked={setEmployeeToEdit}
            onDeleteEmployeeClicked={deleteEmployee}
            />
      </Row>
    
    return ( 
        <>
          {employeeLoading && <Spinner animation='border' variant='primary' />}
  {showEmployeeLoadingError && <p>Something went wrong. Please refresh the page.</p>}
  {!employeeLoading && !showEmployeeLoadingError && 
  <>
  {
    employees.length > 0
    ? employeeGrid
    : <p>You don't have any Employees yet</p>
  }
  
  </>
  }
      { showCreateEmployee &&
      <CreateEmployee
      onDismiss={() => setShowCreateEmployee(false)}
      /* save employee data without need for refresh on page; cb new data to table */
      onEmployeeSaved={(newEmployee) => {
        setEmployee([...employees,newEmployee]);
        setShowCreateEmployee(false);
      }}
      />
      }
      {employeeToEdit && 
      <UpdateEmployee
      employeeToEdit={employeeToEdit}
      onDismiss={() => setEmployeeToEdit(null)}
      /**update employee state by mapping array and replacing the one with matching ids after the update it will set state to null since longer updating employee */
      onEmployeeSaved={(updateEmployee) => {
        setEmployee(employees.map(existingEmployee => existingEmployee._id === updateEmployee._id ? updateEmployee : existingEmployee))
        setEmployeeToEdit(null);
      }}
      />
      }
       <Button className={`mb-4 ${styleUtils.tableButton}`}onClick={() => setShowCreateEmployee(true)}>
        <BsPlusLg className={styleUtils.addPlusIcon}/>
        Create Employee
      </Button>
        </>
     );
}
 
export default EmployeePageLoggedInView;