import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { saveAnime, searchGoogleBooks, anime } from "../utils/API";
import { saveAnimeIds, getSavedAnimeIds } from "../utils/localStorage";

import { useMutation } from "@apollo/react-hooks";
import { SAVE_ANIME } from "../utils/mutation";

const SearchAnime = () => {
  // create state for holding returned google api data
  const [searchedAnime, setSearchedAnime] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved animeId values
  const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());
  //create state to hold saved books and possible erros
  const [saveAnime, { error }] = useMutation(SAVE_ANIME);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleOpenModal = (anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAnime(null);
    setIsModalOpen(false);
  };
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => anime;
    // saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await anime(searchInput);
      // console.log(anime,'anime');
      // console.log(response,'response');
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = await response.json();
      //console.log(items, 'items')
      const animeData = items.data.map((anime) => ({
        animeId: anime._id,
        authors: anime.status || ["No author to display"],
        title: anime.title,
        description: anime.synopsis,
        image: anime.image || "",
        link: anime.link,
      }));

      // console.log(animeData, 'bookdata');

      setSearchedAnime(animeData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a anime to our database
  const handleSaveAnime = async (animeId) => {
    // find the anime in `searchedAnime` state by the matching id
    const animeToSave = searchedAnime.find((anime) => anime.animeId === animeId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveAnime({
        variables: { input: { ...animeToSave } },
      });

      if (error) {
        throw new Error("something went wrong!");
      }

      // if anime successfully saves to user's account, save anime id to state
      setSavedAnimeIds([...savedAnimeIds, animeToSave.animeId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Anime!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a anime"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedAnime.length
            ? `Viewing ${searchedAnime.length} results:`
            : "Search for a anime to begin"}
        </h2>
        <CardColumns>
          {searchedAnime.map((anime) => {
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
                  <p className="small">Status: {anime.authors}</p>
                  <Card.Text>{anime.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedAnimeIds?.some(
                        (savedAnimeId) => savedAnimeId === anime.animeId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveAnime(anime.animeId)}
                    >
                      {savedAnimeIds?.some(
                        (savedAnimeId) => savedAnimeId === anime.animeId
                      )
                        ? "This anime has already been saved!"
                        : "Save this Anime!"}
                    </Button>
                  )}
                  {/* Added a button for the web page link */}

                  <a href="#">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        handleOpenModal(anime);
                      }}
                    >
                      Details
                    </button>
                  </a>
                </Card.Body>
              </Card>
            );
          })}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <img src={selectedAnime.image}></img>
                  <h4 className="modal-title">{selectedAnime.title}</h4>
                </div>
                <div className="modal-body">{selectedAnime.description}</div>
                <div className="modal-footer">
                  <button onClick={handleCloseModal} className="close-btn">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchAnime;
