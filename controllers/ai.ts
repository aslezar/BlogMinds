import axios from "axios"
import { StatusCodes } from "http-status-codes"

//types
import { Request, Response } from "express"

const getTextSuggestion = async (req: Request, res: Response) => {
    const text = req.body.text

    const response = await fetch(
        "https://api-inference.huggingface.co/models/google/gemma-7b",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            },
            body: JSON.stringify({
                inputs: text,
            }),
            redirect: "follow",
        },
    )
    //if statusText is not ok, throw error
    if (response.statusText !== "OK")
        throw new Error(`API Error: ${response.statusText}`)

    const data = await response.json()
    const generated_text = data[0].generated_text

    res.status(StatusCodes.OK).json({
        data: generated_text,
        success: true,
        msg: "Data Fetched Successfully",
        // msg: "This route is not implemented yet.",
    })
}
const getParaSuggestion = async (req: Request, res: Response) => {
    const para = req.body.paragraph

    res.status(StatusCodes.OK).json({
        data: { paragraph: para },
        success: true,
        // msg: "Data Fetched Successfully",
        msg: "This route is not implemented yet.",
    })
}
const getImageSuggestionPrompt = async (req: Request, res: Response) => {
    const prompt = req.body.prompt

    const response = await axios({
        url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        method: "post",
        headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        data: JSON.stringify({
            inputs: prompt,
        }),
        responseType: "stream",
    })

    if (response.statusText !== "OK")
        throw new Error(`API Error: ${response.statusText}`)

    //set headers
    res.set(response.headers)
    response.data.pipe(res)

    // res.status(StatusCodes.OK).json({
    // 	data: { prompt: prompt },
    // 	success: true,
    // 	// msg: "Data Fetched Successfully",
    // 	msg: "This route is not implemented yet.",
    // });
}
const getCoverImageSuggestion = async (req: Request, res: Response) => {
    const titlePrompt = req.body.titlePrompt

    res.status(StatusCodes.OK).json({
        data: { titlePrompt: titlePrompt },
        success: true,
        // msg: "Data Fetched Successfully",
        msg: "This route is not implemented yet.",
    })
}

export {
    getTextSuggestion,
    getParaSuggestion,
    getImageSuggestionPrompt,
    getCoverImageSuggestion,
}
