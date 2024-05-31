import "dotenv/config";
import {Hono} from "hono";
import {handle} from "hono/aws-lambda";
import userRoutes from "./user";
import {serve} from "@hono/node-server";
import {logger} from "hono/logger";
import authRoutes from "./auth";
import complaintRoutes from "./complaint";
import employeeRoutes from "./employee";

const app = new Hono();
app.use(logger());
app.route("/user", userRoutes);
app.route("/auth", authRoutes);
app.route("/complaint", complaintRoutes);
app.route('/employee', employeeRoutes);
app.get("/", (c) => {
    return c.text("Hello World");
});

serve({
    fetch: app.fetch,
    port: 5000,
});

export const handler = handle(app);
