const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList} = graphql;
const _ = require('lodash');


//dummy data
const books = [
    {name: 'Name of the Wind 1', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'Name of the Wind 2', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'Name of the Wind 3', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'Name of the Wind 4', genre: 'Fantasy', id: '3', authorId: '2'},
    {name: 'Name of the Wind 5', genre: 'Fantasy', id: '3', authorId: '3'},
    {name: 'Name of the Wind 6', genre: 'Fantasy', id: '3', authorId: '3'}
]

const authors = [
    {name: 'Patrik 1', age: 42, id: '1'},
    {name: 'Patrik 2', age: 43, id: '2'},
    {name: 'Patrik 3', age: 44, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
                //console.log(parent);
                return _.find(authors, {id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args){
                //code to get data from db / other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type : AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
        
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})
