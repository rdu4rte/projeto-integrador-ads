import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

export function testDirective(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const testDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (testDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          console.log('[test.directive] hello')
          return await resolve(source, args, context, info)
        }
        return fieldConfig
      }
    },
  })
}
