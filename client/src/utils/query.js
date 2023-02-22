import gql from "graphql-tag";
//queries are taken from graphql playground/localhost query tester and pasted here
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      animeCount
      mangaCount
      savedAnimes {
        animeId
        status
        description
        title
        image
        link
      }
      savedMangas {
        mangaId
        status
        description
        title
        image
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
