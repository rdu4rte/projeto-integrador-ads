import { DirectiveLocation, GraphQLDirective, GraphQLSchema } from 'graphql'

import { testDirective } from './test.directive'

/**
 * @description Directives config, the order matters
 */
const schemaDirectives = [{ directive: testDirective, name: 'test' }]

/**
 * @description Directives registry schema
 * @param {GraphQLSchema} schema
 * @returns {GraphQLSchema}
 */
export const transformSchema = (schema: GraphQLSchema): GraphQLSchema => {
  for (const { directive, name } of schemaDirectives) {
    schema = directive(schema, name)
  }
  return schema
}

/**
 * @description Set schema directive to field definition
 * @returns {GraphQLDirective[]}
 */
export const directives: GraphQLDirective[] = [
  new GraphQLDirective({
    name: 'test',
    locations: [DirectiveLocation.FIELD_DEFINITION],
  }),
]
