const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//connect to Mongo DB from MongoDB Atlas
mongoose.connect("mongodb+srv://Techatbizztm:Techatbizztm1!@cluster0.c2qju.mongodb.net/Cluster0?retryWrites=true&w=majority");
mongoose.connection.once('open', ()=>{
    console.log('Connected to Mongo DB');
})

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening on port 4000")
});