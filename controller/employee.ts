import { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { EmployeeService } from "../service/employee.service";
import {
  responseEmployeeValidator,
  updateEmployeeValidator,
} from "../validators/employee.validator";

const employeeService = new EmployeeService();

export class EmployeeController {
  async me(ctx: Context) {
    try {
      const employeeID = ctx.get("userID") as string;
      const employee = await employeeService.findEmployeeByID(employeeID);
      return ctx.json(
        {
          user: responseEmployeeValidator.parse(employee),
          admin: ctx.get("isAdmin") ?? false,
        },
        StatusCodes.OK
      );
    } catch (err) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllEmployees(ctx: Context) {
    try {
      const employees = await employeeService.getAllEmployees();
      return ctx.json(employees, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateEmployee(ctx: Context) {
    try {
      const employeeID = ctx.req.param("id") as string;
      const body = updateEmployeeValidator.parse(await ctx.req.json());
      await employeeService.updateEmployee(employeeID, body);
      return ctx.json(
        { message: "Employee updated successfully" },
        StatusCodes.OK
      );
    } catch (err) {
      console.error(err);
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async updateProfileImage(ctx: Context) {
    try {
      const employeeID = ctx.req.param("id");
      const file = ctx.get("files")[0];
      if (!file) {
        return ctx.json(
          { message: "Profile image is required" },
          StatusCodes.BAD_REQUEST
        );
      }
      await employeeService.updateProfileImage(employeeID, file);
      return ctx.json(
        { message: "Profile image updated successfully" },
        StatusCodes.OK
      );
    } catch (err) {
      console.error(err);
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
