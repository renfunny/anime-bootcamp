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
import { saveBook, searchGoogleBooks, manga } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";

import { useMutation } from "@apollo/react-hooks";
import { SAVE_BOOK } from "../utils/mutation";

const SearchManga = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  //create state to hold saved books and possible erros
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

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
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => manga;
    // saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
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
      console.log(items, "items");
      const mangaData = items.data.map((manga) => ({
        mangaId: manga.id,
        status: manga.attributes.status || ["No status to display"],
        title: manga.attributes.canonicalTitle,
        description: manga.attributes.synopsis,
        image: manga.attributes.posterImage.original || "",
        modalImage: manga.attributes.posterImage.original || "",
        link: manga.links.self,
        rating: manga.attributes.averageRating || "81.76",
      }));

      // console.log(bookData, 'bookdata');

      setSearchedBooks(mangaData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((manga) => manga.mangaId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBook({
        variables: { input: { ...bookToSave } },
      });

      if (error) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.mangaId]);
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
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <CardColumns>
          {searchedBooks.map((manga) => {
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
                        disabled={savedBookIds?.some(
                          (savedBookId) => savedBookId === manga.mangaId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveBook(manga.mangaId)}
                      >
                        {savedBookIds?.some(
                          (savedBookId) => savedBookId === manga.mangaId
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
                    src={selectedManga.modalImage}
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
