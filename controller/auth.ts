import {Context} from "hono";
import {
    createUserValidator,
    loginUserValidator,
    responseUserValidator,
} from "../validators/user.validator";
import {ZodError} from "zod";
import {StatusCodes} from "http-status-codes";
import {AuthService} from "../service/auth.service";
import {
    generateEmployeeJWT,
    generateJWT,
    getPasswordKeys,
    validatePassword,
} from "../lib/auth.lib";
import {UserService} from "../service/user.service";
import {
    createEmployeeValidator,
    loginEmployeeValidator, responseEmployeeValidator,
} from "../validators/employee.validator";
import {EmployeeService} from "../service/employee.service";

const authService = new AuthService();
const userService = new UserService();
const employeeService = new EmployeeService();

export class AuthController {
    async passwordLogin(ctx: Context): Promise<Response> {
        try {
            const body = loginUserValidator.parse(await ctx.req.json());
            let user = await userService.findUserByPhoneNo(body.identity);
            if (!user) {
                user = await userService.findUserByEmail(body.identity);
            }
            if (!user) {
                return ctx.json({message: "User not found"}, StatusCodes.NOT_FOUND);
            }
            const passwordValid = validatePassword(
                body.password,
                user.hash,
                user.salt
            );
            if (!passwordValid) {
                return ctx.json(
                    {message: "Invalid password"},
                    StatusCodes.UNAUTHORIZED
                );
            }
            const token = await generateJWT({id: user.id});
            return ctx.json({token, user: responseUserValidator.parse(user)});
        } catch (err) {
            if (err instanceof ZodError) {
                return ctx.json({message: err.errors}, StatusCodes.BAD_REQUEST);
            }
            return ctx.json(
                {message: "Internal Server Error"},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async otpLogin(ctx: Context): Promise<Response> {
        try {
            const body = loginUserValidator.parse(await ctx.req.json());
            let user = await userService.findUserByPhoneNo(body.identity);
            if (!user) {
                return ctx.json({message: "User not found"}, StatusCodes.NOT_FOUND);
            }
            const token = await generateJWT({id: user.id});
            return ctx.json({token, user: responseUserValidator.parse(user)});
        } catch (err) {
            if (err instanceof ZodError) {
                return ctx.json({message: err.errors}, StatusCodes.BAD_REQUEST);
            }
            console.error(err);
            return ctx.json(
                {message: "Internal Server Error"},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async signup(ctx: Context): Promise<Response> {
        try {
            const body = createUserValidator.parse(await ctx.req.json());
            const {hash, salt} = getPasswordKeys(body.password);
            await authService.createUser(body, hash, salt);
            const user = await userService.findUserByPhoneNo(body.phoneNo);
            const token = await generateJWT({id: user!.id});
            return ctx.json(
                {
                    token,
                    user: responseUserValidator.parse(user),
                },
                StatusCodes.CREATED
            );
        } catch (e) {
            if (e instanceof ZodError) {
                return ctx.json({message: e.errors}, StatusCodes.BAD_REQUEST);
            }
            console.error(e)
            return ctx.json(
                {message: "Internal Server Error"},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async changeEmployeePassword(ctx: Context): Promise<Response> {
        try {
            const id = ctx.req.param("id")
            const {password} = await ctx.req.json()
            const {hash, salt} = getPasswordKeys(password);
            await authService.changeEmployeePassword(id, hash, salt);
            return ctx.json("", StatusCodes.OK)
        } catch (err) {
            console.error(err)
            return ctx.json({message: "Internal Server Error"}, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async createEmployee(ctx: Context): Promise<Response> {
        try {
            const body = createEmployeeValidator.parse(await ctx.req.parseBody());
            const {hash, salt} = getPasswordKeys(body.password);
            await authService.createEmployee(body, ctx.get("files")[0] ?? null, hash, salt);
            const user = await employeeService.getEmployeeByPhone(body.phoneNo);
            return ctx.json(
                {
                    user: responseUserValidator.parse(user),
                    admin: false
                },
                StatusCodes.CREATED
            );
        } catch (e) {
            if (e instanceof ZodError) {
                return ctx.json({message: e.errors}, StatusCodes.BAD_REQUEST);
            }
            console.error(e);
            return ctx.json(
                {message: "Internal Server Error"},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async employeeLogin(ctx: Context): Promise<Response> {
        try {
            const body = loginEmployeeValidator.parse(await ctx.req.json());
            let user = await employeeService.getEmployeeByPhone(body.phoneNo);
            if (!user) {
                return ctx.json({message: "User not found"}, StatusCodes.NOT_FOUND);
            }
            const passwordValid = validatePassword(
                body.password,
                user.hash,
                user.salt
            );
            if (!passwordValid) {
                return ctx.json(
                    {message: "Invalid password"},
                    StatusCodes.UNAUTHORIZED
                );
            }
            const token = await generateEmployeeJWT({id: user.id});
            return ctx.json({
                token,
                user: responseEmployeeValidator.parse(user),
                admin: user.email === process.env.ADMIN_EMAIL
            });
        } catch (err) {
            if (err instanceof ZodError) {
                return ctx.json({message: err.errors}, StatusCodes.BAD_REQUEST);
            }
            console.error(err);
            return ctx.json(
                {message: "Internal Server Error"},
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
