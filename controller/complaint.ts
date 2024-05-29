import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ComplaintService } from "../service/complaint.service";
import { UserService } from "../service/user.service";
import {
  createComplaintNoteValidator,
  createComplaintValidator,
} from "../validators/complaint.validator";
import { Context } from "hono";
import { ZodError } from "zod";

const complaintService = new ComplaintService();
const userService = new UserService();

export class ComplaintController {
  async createComplaint(ctx: Context): Promise<Response> {
    try {
      const userID = ctx.get("userID") as string;
      const body = await ctx.req.parseBody();
      body.attachments = ctx.get("files");
      const input = createComplaintValidator.parse(body);
      await complaintService.createComplaint(input, userID);
      return ctx.json(
        { message: "Complaint created successfully" },
        StatusCodes.CREATED
      );
    } catch (e) {
      if (e instanceof ZodError) {
        return ctx.json({ message: e.errors }, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getComplaintsByUserID(ctx: Context): Promise<Response> {
    try {
      const userID = ctx.get("userID") as string;
      const complaints = await complaintService.getComplaintsByUserID(userID);
      return ctx.json({ data: complaints }, StatusCodes.OK);
    } catch (e) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllComplaints(ctx: Context): Promise<Response> {
    try {
      const complaints = await complaintService.getAllComplaints();
      return ctx.json({ data: complaints }, StatusCodes.OK);
    } catch (e) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getComplaintByID(ctx: Context): Promise<Response> {
    try {
      const complaintID = ctx.req.param("id");
      const complaint = await complaintService.getComplaintByID(complaintID);
      if (!complaint) {
        return ctx.json(
          { message: "Complaint not found" },
          StatusCodes.NOT_FOUND
        );
      }
      return ctx.json({ data: complaint }, StatusCodes.OK);
    } catch (e) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createComplaintNote(ctx: Context): Promise<Response> {
    try {
      const input = createComplaintNoteValidator.parse(await ctx.req.json());
      await complaintService.createComplaintNote(input);
      return ctx.json(
        { message: "Note added successfully" },
        StatusCodes.CREATED
      );
    } catch (e) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getComplaintNotes(ctx: Context): Promise<Response> {
    try {
      const complaintID = ctx.req.param("id");
      const notes = await complaintService.getComplaintNotes(complaintID);
      return ctx.json({ data: notes }, StatusCodes.OK);
    } catch (e) {
      return ctx.json(
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}