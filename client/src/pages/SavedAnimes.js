import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../utils/query";
import { REMOVE_ANIME } from "../utils/mutation";
import Auth from "../utils/auth";
import { removeAnimeId } from "../utils/localStorage";

const SavedAnimes = () => {
  const [removeAnime, { error }] = useMutation(REMOVE_ANIME);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  //const userDataLength = Object.keys(userData).length;

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // create function that accepts the anime's mongo _id value as param and deletes the anime from the database
  const handleDeleteAnime = async (animeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeAnime({ variables: { animeId } });

      if (error) {
        throw new Error("something went wrong!");
      }
      // upon success, remove anime's id from localStorage
      removeAnimeId(animeId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  // return <div>TEST</div>

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved Anime!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData?.savedAnimes?.length
            ? `Viewing ${userData?.savedAnimes?.length} saved ${
                userData?.savedAnimes?.length === 1 ? "anime" : "animes"
              }:`
            : "You have no saved Anime!"}
        </h2>
        <CardColumns>
          {userData?.savedAnimes?.map((anime) => {
            return (
              <Card key={anime.animeId} border="dark">
                {anime.image ? (
                  <Card.Img
                    src={anime.image}
                    alt={`The cover for ${anime.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{anime.title}</Card.Title>
                  <p className="small">Status: {anime.status}</p>
                  <Card.Text>{anime.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteAnime(anime.animeId)}
                  >
                    Delete this Anime!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedAnimes;
