import { Context, Next } from "hono";
import { STATUS_CODES } from "node:http";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verifyEmployeeJWT, verifyJWT } from "../lib/auth.lib";
import { EmployeeService } from "../service/employee.service";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const employeeService = new EmployeeService();
export const authenticate = async (ctx: Context, next: Next) => {
  try {
    let authorization = ctx.req.header("authorization");
    if (!authorization) {
      return ctx.json(
        {
          message: "Authorization header is required",
        },
        StatusCodes.UNAUTHORIZED
      );
    }
    authorization = authorization.split(",")[0].trim()
    const user = await verifyJWT(authorization);
    ctx.set("userID", user.id);
    await next();
    return;
  } catch (e) {
    console.error(e);
    return ctx.json(
      {
        message: "Invalid token",
      },
      StatusCodes.UNAUTHORIZED
    );
  }
};
export const authenticateEmployee = async (ctx: Context, next: Next) => {
  try {
    let authorization = ctx.req.header("authorization");
    if (!authorization) {
      return ctx.json(
        {
          message: "Authorization header is required",
        },
        StatusCodes.UNAUTHORIZED
      );
    }
    authorization = authorization.split(",")[0].trim();
    console.log(authorization);
    const user = await verifyEmployeeJWT(authorization);
    const userData = await employeeService.findEmployeeByID(user.id);
    ctx.set("userID", user.id);
    ctx.set("isAdmin", userData!.email === ADMIN_EMAIL);
    await next();
    return;
  } catch (e) {
    console.error(e);
    return ctx.json(
      {
        message: "Invalid token",
      },
      StatusCodes.UNAUTHORIZED
    );
  }
};
export const adminOnly = async (ctx: Context, next: Next) => {
  try {
    const isAdmin = ctx.get("isAdmin") as boolean;
    if (!isAdmin) {
      return ctx.json(
        {
          message: "You are not authorized to access this resource",
        },
        StatusCodes.FORBIDDEN
      );
    }
    await next();
    return;
  } catch (e) {
    console.error(e);
    return ctx.json(
      { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
