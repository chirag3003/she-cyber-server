import {Hono} from "hono";
import {UserController} from "../controller/user";
import {authenticate} from "../middleware/auth.middleware";

const userController = new UserController()
const userRoutes = new Hono()

userRoutes.get("/me", authenticate, userController.me)
userRoutes.get('/id/:id', userController.getUserByID)

export default userRoutes