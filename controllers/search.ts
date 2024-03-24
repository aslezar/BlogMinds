import User from "../models/user";
import Blogs from "../models/blog";
import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";
import wordnet from "wordnet-db";
import natural from "natural";

const search = async (req: Request, res: Response) => {
    const { type, query } = req.query;
    if (!query) throw new BadRequestError("Query is required");

    switch (type) {
        case "user":
            // Semantic search for users
            const userTokenizer = new natural.WordTokenizer();
            const userQueryTokens = userTokenizer.tokenize(query.toString().toLowerCase());
            let users;

            if (userQueryTokens) {
                users = await User.find({
                    name: { $in: userQueryTokens.map(token => new RegExp(token, 'i')) }
                })
                    .select("name email profileImage")
                    .skip(req.pagination.skip)
                    .limit(req.pagination.limit)
                    .sort({ createdAt: -1 });
            }

            return res.status(StatusCodes.OK).json({
                data: {
                    users,
                    page: req.pagination.page,
                    limit: req.pagination.limit,
                },
                success: true,
                msg: "Users Fetched Successfully",
            });

        case "blog":
            // Semantic search for blogs
            const blogTokenizer = new natural.WordTokenizer();
            const blogStemmer = natural.PorterStemmer;

            // Tokenize and stem the query
            const blogQueryTokens = blogTokenizer.tokenize(query.toString().toLowerCase());
            const stemmedBlogQuery = blogQueryTokens ? blogQueryTokens.map(token => blogStemmer.stem(token)) : [];

            // Add null check for blogQueryTokens
            let synonymTokens: string[] = [];
            let queryObject: any;

            if (blogQueryTokens) {
                // Retrieve synonyms for each token in the query
                const synonyms: string[][] = await Promise.all(blogQueryTokens.map(token => wordnet.synonyms(token)));
                synonymTokens = synonyms.flatMap((synonymList: string[]) => synonymList);

                // Construct query object with semantic search
                queryObject = {
                    $or: [
                        { title: { $in: synonymTokens } },
                        { tags: { $in: synonymTokens } }
                    ]
                };
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
                .sort({ createdAt: -1 });

            return res.status(StatusCodes.OK).json({
                data: {
                    blogs,
                    page: req.pagination.page,
                    limit: req.pagination.limit,
                },
                success: true,
                msg: "Blogs Fetched Successfully",
            });
        default:
            throw new BadRequestError(
                "Invalid type, accepted types are 'user' and 'blog'",
            );
    }
};

export { search };