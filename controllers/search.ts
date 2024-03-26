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
            const totalCount = await User.countDocuments({
                name: { $regex: query, $options: "i" } as any,
            })
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
                    totalCount,
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

            const aggregationPipeline = [
                { $match: queryObject }, // Match the query
                {
                    $lookup: {
                        from: "users", // Assuming the collection name is "authors"
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                { $unwind: "$author" }, // Unwind the author array
                {
                    $project: {
                        // Project only the fields you need
                        title: 1,
                        description: 1,
                        img: 1,
                        tags: 1,
                        views: 1,
                        likesCount: 1,
                        commentsCount: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        author: { _id: 1, name: 1, profileImage: 1 },
                    },
                },

                {
                    $facet: {
                        blogs: [
                            { $skip: req.pagination.skip },
                            { $limit: req.pagination.limit },
                        ],
                        totalCount: [{ $count: "total" }],
                    },
                },
                {
                    $project: {
                        blogs: 1,
                        totalCount: {
                            $arrayElemAt: ["$totalCount.total", 0],
                        },
                        page: {
                            $literal: req.pagination.page,
                        },
                        limit: {
                            $literal: req.pagination.limit,
                        },
                    },
                },
            ]

            const blogs = await Blogs.aggregate(aggregationPipeline)

            return res.status(StatusCodes.OK).json({
                data: blogs[0],
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
