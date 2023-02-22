import gql from "graphql-tag";
//mutation queries are taken from graphql playground/localhost query tester and pasted here
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        mangaCount
        reviews {
          _id
          reviewContent
          reviewerName
        }
        savedAnimes {
          animeId
          description
          image
          link
          status
          title
        }
        savedMangas {
          description
          image
          link
          mangaId
          status
          title
        }
        username
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
        bookCount
        email
        mangaCount
        reviews {
          _id
          reviewContent
          reviewerName
        }
        savedAnimes {
          animeId
          description
          image
          link
          status
          title
        }
        savedMangas {
          description
          image
          link
          mangaId
          status
          title
        }
        username
      }
    }
  }
`;
export const SAVE_ANIME = gql`
  mutation saveAnime($input: animeInput) {
    saveAnime(input: $input) {
      _id
      bookCount
      email
      mangaCount
      reviews {
        _id
        reviewContent
        reviewerName
      }
      savedAnimes {
        animeId
        description
        image
        link
        status
        title
      }
      savedMangas {
        title
        status
        mangaId
        link
        image
        description
      }
      username
    }
  }
`;
export const REMOVE_ANIME = gql`
  mutation removeAnime($animeId: String!) {
    removeAnime(animeId: $animeId) {
      _id
      username
      email
      bookCount
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
export const SAVE_MANGA = gql`
  mutation saveManga($input: mangaInput) {
    saveManga(input: $input) {
      _id
      username
      email
      bookCount
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
export const REMOVE_MANGA = gql`
  mutation removeManga($mangaId: String!) {
    removeManga(mangaId: $mangaId) {
      _id
      username
      email
      bookCount
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
