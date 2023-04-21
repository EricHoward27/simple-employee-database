import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Employee } from "../models/employee";
import { EmployeeInput } from "../network/employees_api";
import * as EmployeeApi from "../network/employees_api";
import styleUtils from "../style/utils.module.css";

interface UpdateEmployeeProps {
    employeeToEdit?: Employee,
    onDismiss: () => void,
    onEmployeeSaved: (employee: Employee) => void,
}
const UpdateEmployee = ({employeeToEdit, onDismiss, onEmployeeSaved}: UpdateEmployeeProps) => {

    /** deconstructed the props from useForm hook; sets default values of form fields to check if each field exists in employeetoedit and assigns its value to the field*/
    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<EmployeeInput>({
        defaultValues: {
            name: employeeToEdit?.name || "",
            department: employeeToEdit?.department || "",
            position: employeeToEdit?.position || "",
            email: employeeToEdit?.email || "",
            phone: employeeToEdit ? Number(employeeToEdit.phone) : 0, 
            birthday: employeeToEdit?.birthday || "",
            location: employeeToEdit?.location || "",
            homeAddress: employeeToEdit?.homeAddress || "",
            hireOn: employeeToEdit?.hireOn || "",
            hours: employeeToEdit?.hours || "",
            
        }
    });
/**if employeetoedit doesn not exist the func will declare a new var employeeresp and create employee */
    async function onSubmit(input: EmployeeInput) {
        try {
            let employeeResponse: Employee;
            if(employeeToEdit) {
                employeeResponse = await EmployeeApi.updateEmployee(employeeToEdit._id, input);

            } else {
                employeeResponse = await EmployeeApi.createEmployee(input);

            } 
            /**check if employeeresponse is truthy before calling  */
                onEmployeeSaved(employeeResponse);
            
            
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return ( 
        <Modal show onHide={onDismiss} className={styleUtils.modal}>
            <Modal.Header closeButton className={styleUtils.modalHeader}>
                <Modal.Title className={styleUtils.modalTitle}>
                    {employeeToEdit ? "Edit Employee " : "Add Employee"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styleUtils.modalBody}>
                <Form id="updateEmployeeForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Name"
                        isInvalid={!!errors.name}
                        {...register("name", { required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.name?.message }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Department"
                        {...register("department")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Position"
                        {...register("position")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Email"
                        {...register("email")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Phone"
                        {...register("phone")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="date"
                        placeholder="Birthday"
                        {...register("birthday")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Location"
                        {...register("location")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Home Address</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Home Address"
                        {...register("homeAddress")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hire on</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="date"
                        placeholder="Hire on"
                        {...register("hireOn")}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hours</Form.Label>
                        <Form.Control className={styleUtils.textInputField}
                        type="text"
                        placeholder="Hours"
                        {...register("hours")}
                        />

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={styleUtils.formButton}
                type="submit"
                form="updateEmployeeForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default UpdateEmployee;