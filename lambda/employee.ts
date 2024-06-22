import { Hono } from "hono";
import { EmployeeController } from "../controller/employee";
import { adminOnly, authenticateEmployee } from "../middleware/auth.middleware";
import { uploadMiddleware } from "../middleware/upload.middleware";

const employeeRoutes = new Hono();
const employeeController = new EmployeeController();

employeeRoutes.get("/me", authenticateEmployee, employeeController.me);
employeeRoutes.get(
  "/",
  authenticateEmployee,
  adminOnly,
  employeeController.getAllEmployees
);
employeeRoutes.put(
  "/:id",
  authenticateEmployee,
  adminOnly,
  employeeController.updateEmployee
);
employeeRoutes.put(
  "/:id/profile-image",
  authenticateEmployee,
  adminOnly,
  uploadMiddleware,
  employeeController.updateProfileImage
);

export default employeeRoutes;
