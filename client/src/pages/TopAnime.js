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

const TopAnimes = () => {
  const [top24Animes, setTop24Animes] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b9076a1794msh0313b8f4ae9404fp1b23a5jsnfb26084b05be",
          "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
        },
      };
      const response = await fetch(
        "https://anime-db.p.rapidapi.com/anime?page=1&size=24&sortBy=ranking&sortOrder=asc",
        options
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const items = await response.json();

      const animeData = items.data.map((anime) => ({
        animeId: anime._id,
        status: anime.status || ["No author to display"],
        title: anime.title,
        description: anime.synopsis,
        image: anime.image || "",
        link: anime.link,
      }));

      setTop24Animes(animeData);
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Top Anime</h1>
        <p>These are the highest rated Anime!</p>
      </div>
      <CardColumns>
        {top24Animes.map((anime) => {
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
                <Card.Text>{anime.description.slice(0, 100)}...</Card.Text>
                <div className="card-buttons">
                  {/* Added a button for the web page link */}

                  <button
                    style={{ margin: "5px 0 0 0", border: "none" }}
                    className="btn-block btn-info btn btn-primary"
                    onClick={(event) => {
                      event.preventDefault();
                      handleOpenModal(anime);
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
                <img src={selectedAnime.image}></img>
                <div className="modal-headertext">
                  <h4 className="modal-title">{selectedAnime.title}</h4>
                  <h6 className="modal-status">
                    Status:{selectedAnime.status}
                  </h6>
                </div>
              </div>
              <div className="modal-body">
                {selectedAnime.description} <br></br>
                For further details
                <a href={selectedAnime.link} target="_blank">
                  {" "}
                  Click here
                </a>
              </div>
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

export default TopAnimes;