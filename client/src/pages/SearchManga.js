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
import { manga } from "../utils/API";
import { getSavedMangaIds } from "../utils/localStorage";

import { useMutation } from "@apollo/react-hooks";
import { SAVE_MANGA } from "../utils/mutation";

const SearchManga = () => {
  // create state for holding returned google api data
  const [searchedMangas, setSearchedMangas] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved mangaId values
  const [savedMangaIds, setSavedMangaIds] = useState(getSavedMangaIds());
  //create state to hold saved mangas and possible erros
  const [saveManga, { error }] = useMutation(SAVE_MANGA);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedManga, setSelectedManga] = useState(null);

  const handleOpenModal = (manga) => {
    setSelectedManga(manga);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedManga(null);
    setIsModalOpen(false);
  };
  // set up useEffect hook to save `savedMangaIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => manga;
    // savemangaIds(savedMangaIds);
  });

  // create method to search for mangas and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await manga(searchInput);
      // console.log(anime,'anime');
      // console.log(response,'response');
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = await response.json();
      const mangaData = items.data.map((manga) => ({
        mangaId: manga.id,
        status: manga.attributes.status || ["No status to display"],
        title: manga.attributes.canonicalTitle,
        description: manga.attributes.synopsis,
        image: manga.attributes.posterImage.original || "",
        link: manga.links.self,
      }));

      // console.log(mangaData, 'mangadata');

      setSearchedMangas(mangaData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a manga to our database
  const handleSaveManga = async (mangaId) => {
    // find the manga in `searchedMangas` state by the matching id
    const mangaToSave = searchedMangas.find(
      (manga) => manga.mangaId === mangaId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveManga({
        variables: { input: { ...mangaToSave } },
      });

      if (error) {
        throw new Error("something went wrong!");
      }

      // if manga successfully saves to user's account, save manga id to state
      setSavedMangaIds([...savedMangaIds, mangaToSave.mangaId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Manga!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a manga"
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
          {searchedMangas.length
            ? `Viewing ${searchedMangas.length} results:`
            : "Search for a manga to begin"}
        </h2>
        <CardColumns>
          {searchedMangas.map((manga) => {
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
                  <Card.Text>{manga.description.slice(0, 100)}...</Card.Text>
                  <div className="card-buttons">
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedMangaIds?.some(
                          (savedMangaId) => savedMangaId === manga.mangaId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveManga(manga.mangaId)}
                      >
                        {savedMangaIds?.some(
                          (savedMangaId) => savedMangaId === manga.mangaId
                        )
                          ? "This manga has already been saved!"
                          : "Save this Manga!"}
                      </Button>
                    )}
                    {/* Added a button for the web page link */}

                    <button
                      style={{ margin: "5px 0 0 0", border: "none" }}
                      className="btn-block btn-info btn btn-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        handleOpenModal(manga);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <img
                    src={selectedManga.image}
                    className="modal-manga-image"
                  ></img>
                  <div className="modal-headertext">
                    <h4 className="modal-title">{selectedManga.title}</h4>
                    <h6 className="modal-status">
                      Status:{selectedManga.status}
                    </h6>
                  </div>
                </div>
                <div className="modal-body">{selectedManga.description}</div>
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

export default SearchManga;