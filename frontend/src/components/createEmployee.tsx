import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Employee } from "../models/employee";
import { EmployeeInput } from "../network/employees_api";
import * as EmployeeApi from "../network/employees_api";
import TextInputField from "./form/textInputField";
import SelectField from "./form/selectField";
import styleUtils from "../style/utils.module.css";

interface createEmployeeProps {
    onDismiss: () => void,
    onEmployeeSaved: (employee: Employee) => void,
}
const CreateEmployee = ({onDismiss, onEmployeeSaved}: createEmployeeProps) => {

    /** deconstructed the props from useForm hook*/
    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<EmployeeInput>();

    async function onSubmit(input: EmployeeInput) {
        try {
            const employeeResponse = await EmployeeApi.createEmployee(input);
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
                    Create a Employee
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styleUtils.modalBody}>
                <Form id="createEmployeeForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField className={styleUtils.textInputField}
                    name="name"
                    label="Name"
                    type= "text"
                    placeholder="Name"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.name}
                    />

                     <TextInputField className={styleUtils.textInputField}
                    name="department"
                    label="Department"
                    type= "text"
                    placeholder="Department"
                    register={register}
                    error={errors.department}
                    />

                   <TextInputField className={styleUtils.textInputField}
                    name="position"
                    label="Position"
                    type= "text"
                    placeholder="Position"
                    register={register}
                    error={errors.position}
                    />

                    <TextInputField className={styleUtils.textInputField}
                    name="email"
                    label="Email"
                    type= "email"
                    placeholder="Email"
                    register={register}
                    error={errors.email}
                    />

                    <TextInputField className={styleUtils.textInputField}
                    name="phone"
                    label="Phone"
                    type= "tel"
                    placeholder="Phone"
                    register={register}
                    error={errors.phone}
                    />

                    <TextInputField className={styleUtils.textInputField}
                    name="birthday"
                    label="Birthday"
                    type= "date"
                    placeholder="Birthday"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.birthday}
                    />
                    
                    <SelectField className={styleUtils.textInputField}
                    name="location"
                    label="Location"
                    register={register}
                    options={[
                        {value:"", label:"-"},
                        {value:"United States", label: "United States"},
                        {value:"Canada", label: "Canada"},
                        {value:"Mexico", label: "Mexico"},
                        {value:"Other", label: "Other"},
                    ]}
                    error={errors.location}
                    />

                    <TextInputField className={styleUtils.textInputField}
                    name="homeAddress"
                    label="Home Address"
                    type= "text"
                    placeholder="Home Address"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.homeAddress}
                    />

                    <TextInputField className={styleUtils.textInputField}
                    name="hireOn"
                    label="Hire On"
                    type= "date"
                    placeholder="Hire On"
                    register={register}
                    error={errors.hireOn}
                    />

                    <SelectField className={styleUtils.textInputField}
                    name="hours"
                    label="Hours"
                    register={register}
                    options={[
                        {value:"", label:"-"},
                        {value:"Full-Time", label: "Full-Time"},
                        {value:"Part-Time", label: "Part-Time"},
                        {value:"Seasonal", label: "Seasonal"},
                    ]}
                    error={errors.hours}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={styleUtils.formButton}
                type="submit"
                form="createEmployeeForm"
                disabled={isSubmitting}
                >
                    Save Employee
                </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default CreateEmployee;