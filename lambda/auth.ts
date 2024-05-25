import { Hono } from "hono";
import { AuthController } from "../controller/auth";
import { uploadMiddleware } from "../middleware/upload.middleware";

const authController = new AuthController();
const authRoutes = new Hono();

authRoutes.post("/login/password", authController.passwordLogin);
authRoutes.post("/login", authController.otpLogin);
authRoutes.post("/signup", authController.signup);
authRoutes.post("/employee/login", authController.employeeLogin);
authRoutes.post(
  "/employee/create",
  uploadMiddleware,
  authController.createEmployee
);

export default authRoutes;
