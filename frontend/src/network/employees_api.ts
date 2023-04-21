import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Employee } from "../models/employee";
import { User } from "../models/users"

/* a wrapper in fetch that will throw error when getting status code to the front end */
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
             throw Error("Request failed with status: " + response.status + "message: " + errorMessage);
        }
       
    }
}
/**fetch log in users */
export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData('/api/users', {
        method: "GET"
    });
    return response.json();
    
}
/**fetch sign up credentials data */
export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}
export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData('/api/users/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

/**fetch login data */
export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

/**logout user fetch data */
export async function logout() {
    await fetchData("/api/users/logout",
    {
        method: "POST",
    });
}

/**fetch all the employees data */
export async function fetchEmployees(): Promise<Employee[]> {
    const response = await fetchData("/api/employees", { method: "GET"});
    return response.json();
}

/* use interface for employee input to save effort; pass it in the async func */
export interface EmployeeInput {
    name: string,
    department: string,
    position: string,
    email: string,
    phone: number,
    birthday: string,
    location: string,
    homeAddress: string,
    hireOn: string,
    hours: string,
}
/** create new employee and returns json data to the frontend */
export async function createEmployee(employee: EmployeeInput): Promise<Employee> {
    const response = await fetchData("/api/employees",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    })
    return response.json()
}

/** update the employee data; returns updated data from api and patch to the frontend */
export async function updateEmployee(employeeId: string, employee: EmployeeInput): Promise<Employee> {
    const response = await fetchData("/api/employees/" + employeeId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    })
    return response.json()
}


/** delete routing func; deletes employee passing params to route */
export async function deleteEmployee(employeeId: string ){
    await fetchData("/api/employees/" + employeeId,
    {
        method: "DELETE",
    })
}