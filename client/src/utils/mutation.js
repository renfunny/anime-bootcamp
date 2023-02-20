import gql from "graphql-tag";
//mutation queries are taken from graphql playground/localhost query tester and pasted here
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            animeCount
            email
            username
            savedAnime {
            animeId
            authors
            description
            image
            link
            title
            }
            reviews {
            _id
            reviewContent
            reviewerName
            }
        }
        }
    }`;
export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            animeCount
            email
            username
            savedAnime {
            animeId
            authors
            description
            image
            link
            title
            }
            reviews {
            _id
            reviewContent
            reviewerName
            }
        }
        }
    }`;
export const SAVE_ANIME = gql`
    mutation SaveAnime {
        saveAnime {
        _id
        animeCount
        email
        username
        savedAnime {
            animeId
            authors
            description
            image
            link
            title
        }
        reviews {
            _id
            reviewContent
            reviewerName
        }
        }
    }`;
export const REMOVE_ANIME = gql`
    mutation RemoveAnime($animeId: String!) {
        removeAnime(animeId: $animeId) {
        _id
        animeCount
        email
        username
        savedAnime {
            animeId
            authors
            description
            image
            link
            title
        }
        reviews {
            _id
            reviewContent
            reviewerName
        }
        }
    }`;
//module.exports = {LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK};