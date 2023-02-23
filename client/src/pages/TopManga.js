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

const TopManga = () => {
  const [top20Mangas, setTop20Manga] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedManga, setSelectedManga] = useState(null);

  const [savedMangaIds, setSavedMangaIds] = useState(getSavedMangaIds());
  //create state to hold saved mangas and possible erros
  const [saveManga, { error }] = useMutation(SAVE_MANGA);

  const handleOpenModal = (manga) => {
    setSelectedManga(manga);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedManga(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      };
      const response = await fetch(
        "https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=0",
        options
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
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

      setTop20Manga(mangaData);
    }
    fetchData();
  }, []);

  // create function to handle saving a manga to our database
  const handleSaveManga = async (mangaId) => {
    // find the manga in `searchedMangas` state by the matching id
    const mangaToSave = top20Mangas.find((manga) => manga.mangaId === mangaId);

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
      <div className="container">
        <h1>Top Manga</h1>
        <p>These are the highest rated Anime!</p>
      </div>
      <CardColumns className="container">
        {top20Mangas.map((manga) => {
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
                <img src={selectedManga.image}></img>
                <div className="modal-headertext">
                  <h4 className="modal-title">{selectedManga.title}</h4>
                  <h6 className="modal-status">
                    Status:{selectedManga.status}
                  </h6>
                  {/* <h6 className="modal-rating">
                    Rating: {selectedManga.rating}
                  </h6> */}
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
    </>
  );
};

export default TopManga;
