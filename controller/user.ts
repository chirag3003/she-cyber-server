import {Context} from "hono";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {UserService} from "../service/user.service";
import {responseUserValidator} from "../validators/user.validator";

const userService = new UserService()

export class UserController {
    async me(ctx: Context): Promise<Response> {
        try {
            const userID = ctx.get("userID") as string
            const user = await userService.findUserByID(userID)
            return ctx.json({data: responseUserValidator.parse(user)}, StatusCodes.OK)
        } catch (e) {
            return ctx.json({message: ReasonPhrases.INTERNAL_SERVER_ERROR}, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserByID(ctx: Context): Promise<Response> {
        try {
            const userID = ctx.req.param("id")
            const user = await userService.findUserByID(userID)
            if (!user) {
                return ctx.json({message: "User not found"}, StatusCodes.NOT_FOUND)
            }
            return ctx.json({data: responseUserValidator.parse(user)}, StatusCodes.OK)
        } catch (e) {
            return ctx.json({message: ReasonPhrases.INTERNAL_SERVER_ERROR}, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}