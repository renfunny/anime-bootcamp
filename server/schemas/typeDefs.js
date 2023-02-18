const {gql} = require("apollo-server-express");

const typeDefs = gql`

type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    reviews:[Review]
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

type Review{
    _id:ID
    reviewContent:String
    reviewerName:String
}

type Query {
    me: User
   reviews(username:String!):[Review]
    review(reviewId:ID!):Review
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(reviewContent:String!): Review
    deleteReview(reviewId:ID!):Review
    saveBook(input: booksInput): User
    removeBook(bookId: String!): User
}

`;

module.exports = typeDefs;