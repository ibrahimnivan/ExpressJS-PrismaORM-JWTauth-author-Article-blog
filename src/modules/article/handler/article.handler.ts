import PrismaClient from "../../../config/db/prisma.db";
import { Request, Response } from "express";
import { object, string } from "yup";
import { hash, compare } from "../../../common/helpers/bcrypt.helper";
import { sign } from "jsonwebtoken";

export interface PostArticlePayload {
  title: string;
  content: string;
  userId: number
}

export interface PatchArticlePayload {
  title?: string;
  content?: string;
}

export const postArticleSchema = object({
  body: object({
    title: string().trim().required("Title is required"), // trim menghapus spasi akhir dan awal
    content: string().trim().required("Content is required")
  }),
});

export const patchArticleSchema = object({
  body: object({
    title: string().trim().optional(),
    content: string().trim().optional()
  }),
});

export const postArticle = async (req: any, res: Response) => {
  try {
    const { title, content } = req.body
    const { userId } = req
    const postArticlePayload: PostArticlePayload = {
      title, content, userId
    }

    const postedArticle = await PrismaClient.article.create({
      data: postArticlePayload
    })

    return res.status(201).json({
      code: 201,
      message: 'Article created successfully',
      data: postedArticle
    })


  } catch (error: any) {
    console.log("@@@ postArticle error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

export const getArticles = async (req: any, res: Response) => {
  try {
    const { userId } = req

    const postedArticle = await PrismaClient.article.findMany({
      where: {
        userId,
      }
    })

    return res.status(200).json({
      code: 200,
      message: 'success',
      data: postedArticle
    })


  } catch (error: any) {
    console.log("@@@ getArticles error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

export const getArticlesById = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req

    const parsedId = parseInt(id);
    if(!parsedId || isNaN(parsedId)) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid ID params'
      })
    }

    const userArticle = await PrismaClient.article.findFirst({
      where: {
        id: parsedId,
        userId,
      }
    })

    if(!userArticle) {
      return res.status(404).json({
        code: 404,
        message: `Article with ID ${id} not found`
      })
    }

    return res.status(200).json({
      code: 200,
      message: 'success',
      data: userArticle
    })


  } catch (error: any) {
    console.log("@@@ getArticles error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

export const patchArticlesById = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req
    const { title, content } = req.body

    const patchArticlePayload = {
      title, content
    }


    const parsedId = parseInt(id);
    if(!parsedId || isNaN(parsedId)) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid ID params'
      })
    }

    const userArticle = await PrismaClient.article.findFirst({
      where: {
        id: parsedId,
        userId,
      }
    })

    if(!userArticle) {
      return res.status(404).json({
        code: 404,
        message: `Article with ID ${id} not found`
      })
    }

    const patchedArticle = await PrismaClient.article.update({
      where: {
        id: parsedId
      }, data: patchArticlePayload
    })

    return res.status(200).json({
      code: 200,
      message: 'success',
      data: userArticle
    })


  } catch (error: any) {
    console.log("@@@ getArticles error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

export const deleteArticlesById = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req

    const parsedId = parseInt(id);
    if(!parsedId || isNaN(parsedId)) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid ID params'
      })
    }

    const userArticle = await PrismaClient.article.findFirst({
      where: {
        id: parsedId,
        userId,
      }
    })

    if(!userArticle) {
      return res.status(404).json({
        code: 404,
        message: `Article with ID ${id} not found`
      })
    }

    await PrismaClient.article.delete({
      where: {
        id: parsedId
      }
    })

    return res.status(200).json({
      code: 200,
      message: `article with ID ${parsedId} deleted successfully`,
    })


  } catch (error: any) {
    console.log("@@@ getArticles error", error.message || error);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}
