import {response, Router} from "express";
import { findCustomersOptions } from "./customer.service.ts";
import { request } from "node:http";

const route = Router();

route.get('/options', async (request, response) =>{
    const customerOptions = await findCustomersOptions();
    response.status(200).json(customerOptions);
});

export default route;