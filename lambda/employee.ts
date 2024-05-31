import {Hono} from "hono";
import {EmployeeController} from "../controller/employee";
import {authenticateEmployee} from "../middleware/auth.middleware";

const employeeRoutes = new Hono()
const employeeController = new EmployeeController()

employeeRoutes.get("/me", authenticateEmployee, employeeController.me)

export default employeeRoutes