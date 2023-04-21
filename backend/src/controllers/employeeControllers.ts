import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import employeeModel from "../models/employeeModels";
import { assertIsDefined } from "../util/assertIsDefined";

export const getEmployees: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        /**assert is used to pass the userId val to authenticatedUserId; */
        assertIsDefined(authenticatedUserId);

        const employee = await employeeModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(employee);
    } catch (error) {
        // pass error middleware arg using nextFunction-just wanted to cleanup code and not have it in catch func
       next(error);

    }
  
};
export const getEmployee: RequestHandler =async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        // condition statement used to check ID if not in data throw error using http error message 
        if (!isValidObjectId(employeeId)) {
            throw createHttpError(400, "Invalid Employee ID");
        }
        const employee = await employeeModel.findById(employeeId).exec();
        if (!employee) {
            // if employee not found throw error using http error message
            throw createHttpError(404, "Employee not found");
        }
        if (!employee.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "Cannot access this employee");
        }
        res.status(200).json(employee);
    } catch (error) {
        next(error);
    }
};

interface createEmployeeBody {
    name?: string,
    department?: string,
    position?: string,
    email: string,
    phone: number,
    birthday: Date,
    location: string,
    homeAddress: string,
    hireOn: Date,
    hours: string,

}

export const createEmployee: RequestHandler<unknown, unknown, createEmployeeBody, unknown>=async (req, res, next) => {
    // requesting data from the model to store data into the vars
    const name = req.body.name;
    const department = req.body.department;
    const position = req.body.position;
    const email = req.body.email;
    const phone = req.body.phone;
    const birthday = req.body.birthday;
    const location = req.body.location;
    const homeAddress = req.body.homeAddress;
    const hireOn = req.body.hireOn;
    const hours = req.body.hours;

    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!name) {
            throw createHttpError(400, "Name must be input");
        }

        // use trycatch to create the new employee data 
        const newEmployee = await employeeModel.create({
            userId: authenticatedUserId,
            name: name,
            department: department,
            position: position,
            email: email,
            phone: phone, 
            birthday: birthday,
            location: location, 
            homeAddress: homeAddress,
            hireOn: hireOn,
            hours: hours,
        });
        // create new employee data is successful
        res.status(201).json(newEmployee);
    } catch (error) {
        // will throw error if employee data created failed
        next(error);
    }
};

interface updateEmployeeParams {
    employeeId: string,
}

interface updateEmployeeBody {
    name?: string,
    department?: string,
    position: string,
    email: string,
    phone: number,
    birthday: string,
    location: string,
    homeAddress: string,
    hireOn: string,
    hours: string,
}

export const updateEmployee: RequestHandler<updateEmployeeParams, unknown, updateEmployeeBody, unknown> =async (req, res, next) => {
   const employeeId = req.params.employeeId;
   const newName = req.body.name;
   const newDepartment = req.body.department;
   const newPosition = req.body.position;
   const newEmail = req.body.email;
   const newPhone = req.body.phone;
   const newBirthday = req.body.birthday;
   const newLocation = req.body.location;
   const newHomeAddress = req.body.homeAddress;
   const newHireOn = req.body.hireOn;
   const newHours = req.body.hours;

   const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        if (!isValidObjectId(employeeId)) {
            throw createHttpError(400, "Invalid Employee ID");
        }
        if (!newName) {
            throw createHttpError(400, "Name must be input");
        }
        const employee = await employeeModel.findById(employeeId).exec()
        if (!employee) {
            // if employee not found throw error using http error message
            throw createHttpError(404, "Employee not found");
        }
        if (!employee.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this employee");
        }

        employee.name = newName;
        employee.department = newDepartment;
        employee.position = newPosition;
        employee.email = newEmail;
        employee.phone = newPhone;
        employee.birthday = newBirthday;
        employee.location = newLocation;
        employee.homeAddress = newHomeAddress;
        employee.hireOn = newHireOn;
        employee.hours = newHours;

        const updatedEmployee = await employee.save();
        
        res.status(200).json(updatedEmployee);

    } catch (error) {
        next(error);
    }
};

export const deleteEmployee: RequestHandler =async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        if (!isValidObjectId(employeeId)) {
            throw createHttpError(400, "Invalid Employee ID");
        }

        const employee = await employeeModel.findById(employeeId).exec()
        
        if (!employee) {
            throw createHttpError(404, " Employee not found");
        }

        if (!employee.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this employee");
        }
        await employee.deleteOne();

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};