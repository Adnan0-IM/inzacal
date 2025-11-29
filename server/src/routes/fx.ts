import { Router } from "express";
import { getExchangeRate, refreshExchangeRate } from "../controller/fx.js";

const fxRouter = Router();

fxRouter.get("/", getExchangeRate);

fxRouter.post("/refresh", refreshExchangeRate);

export { fxRouter };
