var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = require('./src/schema');
var cors = require('cors')
var root = { hello: () => 'Hello world!' };
var app = express();


app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'));