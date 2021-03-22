import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { elasticApiFieldConfig } from 'graphql-compose-elasticsearch';

const expressPort = process.env.port || process.env.PORT || 9201;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            patents: elasticApiFieldConfig({
                host: 'https://patent-search-202108.api.lens.org/patents/_search',
                apiVersion: '7.6',
            }),
        },
    }),
});

const server = express();
server.use(
    '/',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

server.listen(expressPort, () => {
    console.log(`The server is running at http://localhost:${expressPort}/`);
});
