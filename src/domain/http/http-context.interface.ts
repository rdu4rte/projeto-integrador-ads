import { Request, Response } from 'express'
import { Db } from 'mongodb'

export interface HttpContext {
  req: Request
  res: Response
  headers?: {
    authorization?: string
  }
  dbConn?: Db
}
