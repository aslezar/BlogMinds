import { search } from "../controllers/search"
import { Router } from "express"
const router = Router()

router.get("/", search)

export default router
