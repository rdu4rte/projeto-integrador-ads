import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

import { MongoDbConnector } from '@/infra/db/connectors'
import { config } from '@/main/config'

export function dbConnectionDirective(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const dbConnDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (dbConnDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const connection = await MongoDbConnector.getConnection(
            config.mongoDb.host,
            config.mongoDb.user,
            config.mongoDb.password,
            config.mongoDb.database
          )

          context['dbConn'] = connection
          return await resolve(source, args, context, info)
        }
        return fieldConfig
      }
    },
  })
}
