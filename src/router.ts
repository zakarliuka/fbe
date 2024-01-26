import { AuthRouter } from "./features/auth";
import { OrderRouter } from "./features/order";
import { ProductRouter } from "./features/product";
import { UserRouter } from "./features/user";

import { Router } from "express";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/order", OrderRouter);

export default router;
