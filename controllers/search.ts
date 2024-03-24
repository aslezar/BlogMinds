import User from "../models/user"
import Blogs from "../models/blog"
import { Request, Response } from "express"
import { BadRequestError } from "../errors"
import { StatusCodes } from "http-status-codes"
import natural from "natural"
import WordNet from "node-wordnet"

const wordnet = new WordNet()
const blogTokenizer = new natural.WordTokenizer()

const getSynonyms = (word: string) => {
    return new Promise<string[]>((resolve, reject) => {
        wordnet.lookup(word, (err: Error | null, definitions: any[]) => {
            if (err) {
                reject(err)
            } else {
                const synonyms = definitions.reduce((acc, definition) => {
                    if (definition.synonyms) {
                        return acc.concat(definition.synonyms)
                    } else {
                        return acc
                    }
                }, [])
                resolve(synonyms)
            }
        })
    })
}

const search = async (req: Request, res: Response) => {
    const { type, query } = req.query
    if (!query) throw new BadRequestError("Query is required")

    switch (type) {
        case "user":
            const users = await User.find({
                name: { $regex: query, $options: "i" } as any,
            })
                .select("name email profileImage")
                .skip(req.pagination.skip)
                .limit(req.pagination.limit)
                .sort({ createdAt: -1 })

            return res.status(StatusCodes.OK).json({
                data: {
                    users,
                    page: req.pagination.page,
                    limit: req.pagination.limit,
                },
                success: true,
                msg: "Users Fetched Successfully",
            })

        case "blog":
            const blogQueryTokens = blogTokenizer.tokenize(
                query.toString().toLowerCase(),
            )

            let synonymTokens: string[] = []
            let queryObject: any

            if (blogQueryTokens) {
                const synonyms: string[][] = await Promise.all(
                    blogQueryTokens.map((token) => getSynonyms(token)),
                )

                synonymTokens = synonyms.flatMap(
                    (synonymList: string[]) => synonymList,
                )

                queryObject = {
                    $or: [
                        {
                            title: {
                                $regex: query.toString(),
                                $options: "i",
                            },
                        },
                        { title: { $in: synonymTokens } },
                        { tags: { $in: synonymTokens } },
                    ],
                }
            }

            const blogs = await Blogs.find(queryObject)
                .select(
                    "title description img author tags views likesCount commentsCount createdAt updatedAt",
                )
                .populate({
                    path: "author",
                    select: "name profileImage",
                })
                .skip(req.pagination.skip)
                .limit(req.pagination.limit)

            return res.status(StatusCodes.OK).json({
                data: {
                    blogs,
                    page: req.pagination.page,
                    limit: req.pagination.limit,
                },
                success: true,
                msg: "Blogs Fetched Successfully",
            })
        default:
            throw new BadRequestError(
                "Invalid type, accepted types are 'user' and 'blog'",
            )
    }
}

export { search }
