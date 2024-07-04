import {Hono} from "hono";
import {AuthController} from "../controller/auth";
import {uploadMiddleware} from "../middleware/upload.middleware";
import {adminOnly, authenticate, authenticateEmployee} from "../middleware/auth.middleware";

const authController = new AuthController();
const authRoutes = new Hono();

authRoutes.post("/login/password", authController.passwordLogin);
authRoutes.post("/login", authController.otpLogin);
authRoutes.post("/signup", authController.signup);
authRoutes.post("/employee/login", authController.employeeLogin);
authRoutes.post(
    "/employee/create",
    authenticateEmployee,
    adminOnly,
    uploadMiddleware,
    authController.createEmployee
);
authRoutes.put('/employee/:id/changePassword', authenticateEmployee, adminOnly, authController.changeEmployeePassword);


export default authRoutes;
