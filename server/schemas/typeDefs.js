const {gql} = require("apollo-server-express");

const typeDefs = gql`

type User{
    _id: ID
    username: String
    email: String
    animeCount: Int
    savedAnime: [Book]
    reviews:[Review]
}

type Anime{
    animeId: String
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

input animeInput {
    animeId: String
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
    saveAnime(input: booksInput): User
    removeAnime(bookId: String!): User
}

`;

module.exports = typeDefs;