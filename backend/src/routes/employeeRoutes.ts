import  express  from "express";
import * as employeeController from "../controllers/employeeControllers"

const router = express.Router();

router.get('/', employeeController.getEmployees);

router.get('/:employeeId', employeeController.getEmployee)

router.post('/', employeeController.createEmployee);

router.patch("/:employeeId", employeeController.updateEmployee);

router.delete('/:employeeId', employeeController.deleteEmployee);

export default router;