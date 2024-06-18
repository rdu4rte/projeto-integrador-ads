import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
})

const env = (key: string) => process.env[key]

type Config = {
  isDev: boolean
  port: number
}

export const config: Config = {
  isDev: env('NODE_ENV') === 'development',
  port: +env('PORT') || 4000,
}
