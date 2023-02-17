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
import { saveBook, searchGoogleBooks, anime } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";

import { useMutation } from "@apollo/react-hooks";
import { SAVE_BOOK } from "../utils/mutation";

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  //create state to hold saved books and possible erros
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleOpenModal = (book) => {
    setSelectedAnime(book);
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
      const bookData = items.data.map((book) => ({
        bookId: book._id,
        authors: book.status || ["No author to display"],
        title: book.title,
        description: book.synopsis,
        image: book.image || "",
        link: book.link,
      }));

      //console.log(bookData, 'bookdata');

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

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
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
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
                  placeholder="Search for a book"
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
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Status: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
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
                        handleOpenModal(book);
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

export default SearchBooks;
