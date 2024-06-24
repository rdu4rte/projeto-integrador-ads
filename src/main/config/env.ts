import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
})

const env = (key: string) => process.env[key]

type Config = {
  isDev: boolean
  port: number
  mongoDb: {
    host: string
    user: string
    password: string
    database: string
  }
}

export const config: Config = {
  isDev: env('NODE_ENV') === 'development',
  port: +env('PORT') || 4000,
  mongoDb: {
    host: env('MONGODB_HOSTS') || 'mongodb:27017',
    user: env('MONGODB_USERNAME') || 'test',
    password: env('MONGODB_PASSWORD') || 'test',
    database: env('MONGODB_DATABASE') || 'global',
  },
}
