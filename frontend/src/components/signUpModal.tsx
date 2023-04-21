import { useForm } from "react-hook-form";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { User } from "../models/users"
import { SignUpCredentials } from "../network/employees_api";
import * as EmployeesApi from "../network/employees_api";
import TextInputField from "./form/textInputField";
import styleUtils from "../style/utils.module.css"
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";


interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}



const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpCredentials>();

    const [errorText, setErrorText] = useState<string | null>(null);
    
    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await EmployeesApi.signUp(credentials);
            onSignUpSuccessful(newUser);

        } catch (error) {
            if ( error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
            
        }
        
    }
    return ( 
        <Modal show onHide={onDismiss} className={styleUtils.modal}>
            <Modal.Header closeButton className={styleUtils.modalHeader}>
                <Modal.Title className={styleUtils.modalTitle}>
                Sign Up
                </Modal.Title>
              
            </Modal.Header>

            <Modal.Body className={styleUtils.modalBody}>
            {errorText &&
            <Alert variant="danger">{errorText}</Alert>
            }
                <Form onSubmit={handleSubmit(onSubmit)} className={styleUtils.form}>
                    <TextInputField className={styleUtils.textInputField}
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.username}
                    />
                     <TextInputField className={styleUtils.textInputField}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.email}
                    />
                     <TextInputField className={styleUtils.textInputField}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} className={styleUtils.formButton}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default SignUpModal;