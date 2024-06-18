import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule as GQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { directives, transformSchema } from '../graphql/directives'

@Module({
  imports: [
    GQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => req,
      transformSchema: (schema) => transformSchema(schema),
      buildSchemaOptions: {
        directives,
      },
    }),
  ],
})
export class GraphQLModule {}
