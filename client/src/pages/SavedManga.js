import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

//import { getMe, deleteBook } from '../utils/API';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../utils/query";
import { REMOVE_MANGA } from "../utils/mutation";
import Auth from "../utils/auth";
import { removeMangaId } from "../utils/localStorage";

const SavedMangas = () => {
  const [removeManga, { error }] = useMutation(REMOVE_MANGA);
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

  // create function that accepts the manga's mongo _id value as param and deletes the manga from the database
  const handleDeleteManga = async (mangaId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeManga({ variables: { mangaId } });

      if (error) {
        throw new Error("something went wrong!");
      }
      // upon success, remove manga's id from localStorage
      removeMangaId(mangaId);
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
          <h1>Viewing saved Manga!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData?.savedMangas?.length
            ? `Viewing ${userData?.savedMangas?.length} saved ${
                userData?.savedMangas?.length === 1 ? "manga" : "mangas"
              }:`
            : "You have no saved Manga!"}
        </h2>
        <CardColumns>
          {userData?.savedMangas?.map((manga) => {
            return (
              <Card key={manga.mangaId} border="dark">
                {manga.image ? (
                  <Card.Img
                    src={manga.image}
                    alt={`The cover for ${manga.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{manga.title}</Card.Title>
                  <p className="small">Status: {manga.status}</p>
                  <Card.Text>{manga.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteManga(manga.mangaId)}
                  >
                    Delete this Manga!
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

export default SavedMangas;