import gql from 'graphql-tag';
//queries are taken from graphql playground/localhost query tester and pasted here
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks{
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
//module.exports = GET_ME;