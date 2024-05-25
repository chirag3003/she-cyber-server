import { Hono } from "hono";
import { AuthController } from "../controller/auth";

const authController = new AuthController();
const authRoutes = new Hono();

authRoutes.post("/login/password", authController.passwordLogin)
authRoutes.post("/login", authController.otpLogin);
authRoutes.post("/signup", authController.signup);

export default authRoutes;
