
import express from "express"
import routes from "../routes"
import {create_work, delete_work, update_work, read_works} from "../controllers/workController"


const workRouter = express.Router();

workRouter.post(routes.work, create_work);
workRouter.delete(routes.work_detail, delete_work);
workRouter.put(routes.work_detail, update_work);
workRouter.post(routes.work_detail, read_works)

export default workRouter;