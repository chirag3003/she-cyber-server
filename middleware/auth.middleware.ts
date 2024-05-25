import { Context, Next } from "hono";
import { STATUS_CODES } from "node:http";
import { StatusCodes } from "http-status-codes";
import { verifyEmployeeJWT, verifyJWT } from "../lib/auth.lib";

export const authenticate = async (ctx: Context, next: Next) => {
  try {
    const authorization = ctx.req.header("authorization");
    if (!authorization) {
      return ctx.json(
        {
          message: "Authorization header is required",
        },
        StatusCodes.UNAUTHORIZED
      );
    }
    const user = await verifyJWT(authorization);
    ctx.set("userID", user.id);
    await next();
    return;
  } catch (e) {
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
    const authorization = ctx.req.header("authorization");
    if (!authorization) {
      return ctx.json(
        {
          message: "Authorization header is required",
        },
        StatusCodes.UNAUTHORIZED
      );
    }
    const user = await verifyEmployeeJWT(authorization);
    ctx.set("userID", user.id);
    await next();
    return;
  } catch (e) {
    return ctx.json(
      {
        message: "Invalid token",
      },
      StatusCodes.UNAUTHORIZED
    );
  }
};
