import { Request, Response, NextFunction } from "express"

function paginate(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page?.toString() ?? "") || 1
    let limit = parseInt(req.query.limit?.toString() || "") || 10
    limit = Math.min(limit, 100)
    limit = Math.max(limit, 1)
    const skip = (page - 1) * limit

    req.pagination = { skip, limit, page }

    next()
}

export default paginate
