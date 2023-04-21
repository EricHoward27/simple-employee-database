import { useForm } from "react-hook-form";
import { User } from "../models/users";
import { LoginCredentials } from "../network/employees_api";
import * as EmployeesApi from "../network/employees_api";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import TextInputField from "./form/textInputField";
import styleUtils from "../style/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";


interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user:User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();

    const [errorText, setErrorText] = useState<string | null>(null);

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await EmployeesApi.login(credentials);
            onLoginSuccessful(user)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
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
                    Log In
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styleUtils.modalBody}>
                {errorText &&
                <Alert variant="danger">{errorText}</Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField className={styleUtils.textInputField}
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                    />
                     <TextInputField className={styleUtils.textInputField}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} className={styleUtils.formButton}>
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default LoginModal;