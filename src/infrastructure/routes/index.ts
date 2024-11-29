import express from "express";
import initDatabase from "@database";
import { customerRoute } from "@routes/CustomerRoute";
import { employeeRoute } from "@routes/EmployeeRoute";

export const apiRoutes = express.Router();

initDatabase();

apiRoutes.use("/customer", customerRoute);
apiRoutes.use("/employee", employeeRoute);
