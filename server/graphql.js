import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  playground: {
    settings: {
      'editor.theme': 'light',
      'tracing.hideTracingResponse': false
    },
    tabs: [
      {
        name: 'Test',
        endpoint: '/api/graphql',
        query: 'query {\n  hello\n}'
      }
    ]
  }
})

const app = express()

app.use(server.getMiddleware({ path: '/' }))

export default app
