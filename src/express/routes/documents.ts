import HttpStatus from 'http-status-codes'

import { Request, Response, Router } from 'express'

import { errorWrapper } from '../errors'

import { model } from '../../db'

import { matchReviewsWithTimestamp } from '../../modules/matchReviewsWithTimestamp'

import { Review } from '../../model/review'
import { Document } from '../../model/document'

import { getDocumentBy } from '../../services/document'
import { getReviewsBy, addReview } from '../../services/review'

const router = Router()

const getReviewBy = async (res: Response, title: string, timestamp: string) => {
  const document: Document = await getDocumentBy(model, title)
  if (!document) res.status(HttpStatus.NOT_FOUND)
  const reviews = await getReviewsBy(model, document.id)
  const review = matchReviewsWithTimestamp(reviews, timestamp)
  if (!review) res.status(HttpStatus.NOT_FOUND)
  return review
}

router.get(
  '/',
  errorWrapper(async (req: Request, res: Response) => {
    res.send(await (await model).Document.findAll())
  })
)

router.get(
  '/:title',
  errorWrapper(async (req: Request, res: Response) => {
    const title: string = req.params.title
    const document: Document = await getDocumentBy(model, title)
    if (!document) res.status(HttpStatus.NOT_FOUND)
    const reviews = await getReviewsBy(model, document.id)
    res.send(reviews)
  })
)

router.get(
  '/:title/latest',
  errorWrapper(async (req: Request, res: Response) => {
    const title: string = req.params.title
    const timestamp: string = new Date().toISOString()
    const review: Review = await getReviewBy(res, title, timestamp)
    res.send(review)
  })
)

router.get(
  '/:title/:timestamp',
  errorWrapper(async (req: Request, res: Response) => {
    const title: string = req.params.title
    const timestamp: string = req.params.timestamp
    const review: Review = await getReviewBy(res, title, timestamp)
    res.send(review)
  })
)

router.post(
  '/:title',
  errorWrapper(async (req: Request, res: Response) => {
    const title: string = req.params.title
    const document: Document = await getDocumentBy(model, title)
    if (!document) res.status(HttpStatus.NOT_FOUND)

    const content: string = req.body.content
    if (!content) res.status(HttpStatus.BAD_REQUEST)

    const review: Review = await addReview(model, content, document.id)
    res.send(review)
  })
)

export default router
