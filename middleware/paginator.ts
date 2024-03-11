import { Request, Response, NextFunction } from "express"

function paginate(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page?.toString() ?? "") || 1
    const limit = parseInt(req.query.limit?.toString() || "") || 10
    const skip = (page - 1) * limit

    req.pagination = { skip, limit }

    next()
}

export default paginate
