import gql from "graphql-tag";
//mutation queries are taken from graphql playground/localhost query tester and pasted here
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        animeCount
        mangaCount
        savedAnimes {
          animeId
          title
          description
          status
          link
          image
        }
        savedMangas {
          mangaId
          title
          description
          status
          link
          image
        }
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        animeCount
        mangaCount
        savedAnimes {
          animeId
          title
          description
          status
          link
          image
        }
        savedMangas {
          mangaId
          title
          description
          status
          link
          image
        }
      }
    }
  }
`;
export const SAVE_ANIME = gql`
  mutation saveAnime($input: animeInput!) {
    saveAnime(input: $input) {
      _id
      username
      email
      savedAnimes {
        animeId
        title
        description
        status
        link
        image
      }
    }
  }
`;
export const REMOVE_ANIME = gql`
  mutation removeAnime($animeId: String!) {
    removeAnime(animeId: $animeId) {
      _id
      username
      email
      animeCount
      savedAnimes {
        animeId
        title
        description
        status
        link
        image
      }
    }
  }
`;
export const SAVE_MANGA = gql`
  mutation saveManga($input: mangaInput!) {
    saveManga(input: $input) {
      _id
      username
      email
      savedMangas {
        mangaId
        title
        description
        status
        link
        image
      }
    }
  }
`;
export const REMOVE_MANGA = gql`
  mutation removeManga($mangaId: String!) {
    removeManga(mangaId: $mangaId) {
      _id
      username
      email
      mangaCount
      savedMangas {
        mangaId
        title
        description
        status
        link
        image
      }
    }
  }
`;
