import gql from "graphql-tag";
//queries are taken from graphql playground/localhost query tester and pasted here
export const GET_ME = gql`
  query Me {
    me {
      _id
      animeCount
      email
      username
      email
      bookCount
      savedBooks{
        bookId
        authors
        image
        description
        image
        link
        title
        link
      }
      reviews {
        _id
        reviewContent
        reviewerName
      }
    }
  }
`;
//module.exports = GET_ME;