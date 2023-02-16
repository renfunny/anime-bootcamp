const {gql} = require("apollo-server-express");

const typeDefs = gql`

type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID
    user: User
}

input booksInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: booksInput): User
    removeBook(bookId: String!): User
}

`;

module.exports = typeDefs;