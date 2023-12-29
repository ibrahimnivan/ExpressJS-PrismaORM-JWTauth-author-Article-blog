import { Router } from "express";
import { inputValidator } from "../../../common/helpers/validator.helper";
import authorizationMiddleware from "../../../common/middleware/authorization.middleware";
import { deleteArticlesById, getArticles, getArticlesById, patchArticlesById, postArticle, postArticleSchema } from "../handler/article.handler";


const articleRouter = Router()

articleRouter.post('/', authorizationMiddleware, inputValidator(postArticleSchema), postArticle)
articleRouter.get('/', authorizationMiddleware, getArticles )
articleRouter.get('/:id', authorizationMiddleware, getArticlesById )
articleRouter.patch('/:id', authorizationMiddleware, patchArticlesById )
articleRouter.delete('/:id', authorizationMiddleware, deleteArticlesById )

export default articleRouter
