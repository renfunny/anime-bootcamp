import React from "react";

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



export default TopAnime;