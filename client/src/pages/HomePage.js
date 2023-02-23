import React from "react";
import { Carousel, Card } from "react-bootstrap";

//
//
//
const HomePage = () => {
  return (
    <>
      <div className="home-container d-flex">
        <div className="home-heading">
          <h1>Welcome to Anime Bootcamp!</h1>
          <p>Browse for your favourite Anime and Manga!</p>
        </div>

        <div className="anime-section row">
          <div className="col-5">
            <h3>Highly Anticipated Anime!</h3>
            <Carousel className="home-carousel">
              <Carousel.Item className="home-carousel-item">
                <img
                  className="d-block"
                  src="https://www.denofgeek.com/wp-content/uploads/2022/04/FPbgN6-XwAsJfar.jpeg?resize=732,1024"
                  alt="First slide"
                />
                {/* <Carousel.Caption className="home-carousel-caption">
                                    <h3>Attack On Titan</h3>
                                    <p>Season 4 Part 3 is set to air on March 3rd, 2023</p>
                                </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item className="home-carousel-item">
                <img
                  className="d-block"
                  src="https://sportshub.cbsistatic.com/i/2022/06/08/94653059-d16f-4567-b63a-a924c90af88f/vinland-saga-season-2.jpg?auto=webp&width=707&height=1000&crop=0.707:1,smart"
                  alt="Second slide"
                />
                {/* <Carousel.Caption className="home-carousel-caption">
                                    <h3>Vinland Saga</h3>
                                    <p>Airing Now!</p>
                                </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item className="home-carousel-item">
                <img
                  className="d-block w-100"
                  src="https://pbs.twimg.com/media/FjtJZ5VUYAIi1xH?format=jpg&name=medium"
                  alt="Third slide"
                />
                {/* <Carousel.Caption className="home-carousel-caption">
                                    <h3>Dr. Stone</h3>
                                    <p>Season 3 is set to air April 2023</p>
                                </Carousel.Caption> */}
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="col-7">
            <h4>The Big Three Genres</h4>
            <div className="d-flex">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Shonen</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Most Popular
                  </Card.Subtitle>
                  <Card.Text>
                    Derives from the japanese magazine "Weekly Shōnen Jump".
                    Media in this genre are usually aimed for kids and have a
                    fair focus on action and comedy.
                  </Card.Text>
                  <Card.Link
                    className="anime-genre-link"
                    target="_blank"
                    href="https://www.viz.com/shonenjump"
                  >
                    Viz/shonenjump
                  </Card.Link>
                  <Card.Link
                    className="anime-genre-link"
                    target="_blank"
                    href="https://myanimelist.net/anime/genre/27/Shounen"
                  >
                    MAL
                  </Card.Link>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Romance</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Broken Souls
                  </Card.Subtitle>
                  <Card.Text>
                    A narrative that mostly focuses on the interactions of two
                    love interests who are always either absolutely terrible for
                    each other or starbound lovers. (spoiler: They kiss at the
                    end)
                  </Card.Text>
                  <Card.Link
                    className="anime-genre-link"
                    target="_blank"
                    href="https://myanimelist.net/anime/genre/22/Romance"
                  >
                    MAL
                  </Card.Link>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Slice of Life</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Grocery Store Arc
                  </Card.Subtitle>
                  <Card.Text>
                    Focus is on seemingly random and mundane periods of time of
                    the main character's lives. Typically light hearted content
                    for those who find joy in the more simple and casual
                    interactions.
                  </Card.Text>
                  <Card.Link
                    className="anime-genre-link"
                    target="_blank"
                    href="https://myanimelist.net/anime/genre/36/Slice_of_Life"
                  >
                    MAL
                  </Card.Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        <div className="manga-section row">
          <div className="col-7">
            <h4>Staff Recommends</h4>
            <div className="container d-flex">
              <Card>
                <Card.Header>Kush (@family60)</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      20th Century Boys is a must read. I've never wanted to
                      uncover the truth behind a cult so badly before. Everytime
                      I thought it couldn't get crazier, it did. Kept my
                      attention the whole time. This is defininetly on par with
                      Naoki Urasawa's "Monster". If you're looking for something to read, you simply cannot
                      go wrong with this series.{" "}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Renato (@renfunny)</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      Vinland Saga has 2 seasons so far, each telling interesting
                      parts of the main character's (Thorfinn) life as a viking. 
                      With stunning visuals, intense action sequences, and complex character
                      development, this series is a must-watch for fans of
                      historical and action anime.{" "}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Anmol (@anmolgupta313)</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      I've learnt many life lessons through watching Naruto.
                      The themes of friendship and hardwork run deep throughout the main story
                      and character interactions. Each character provides an interesting take on something in life
                      and it's never as simple as one person is bad or one person is good.{" "}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Vijithiran (@wiju24)</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      Bluelock is an excellent anime to get your feet wet into the world of anime.
                      This show makes an uneventful sport - like football - action-packed, suspenseful 
                      but also makes you want to binge-watch in one sitting.
                      The super powers each character has really makes the style of football fun and entertaining.{" "}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Abdallah (@abdallahnasseruoftdevop)</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      Death Note was my first anime and it delivered on everything that was promised to me.
                      Both the main character and "villian" are incredibly smart and it was so much fun watching
                      the two try to out smart one another. If you like crime/investigative shows, this is a must watch{" "}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Icaro (@Kikolock)</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      It's over 8000 !!! As an old school guy, I strongly recommend Dragon Ball, Specially the classic
                      and Z seasons. You can watch multiple seasons without feeling old, because it's just amazing!
                      As much as the fights last several episodes, they are still the best fights ever seen in anime.
                      It's an anime with Humour, fights, family, fights, food, fights and more fights.{" "}
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="col-5">
            <h4>Hottest Ongoing Manga!</h4>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://memestatic1.fjcdn.com/comments/Theres+a+lot+of+iconic+panels+in+berserk+the+art+_03ab35dd659e7ed67fe9f3c96a99a078.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3 className="manga-carousel-caption">Berserk</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/9c/0f/40/9c0f40b7af6b846f45592d48220ba7d3.jpg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3 className="manga-carousel-caption">Kingdom</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://e1.pxfuel.com/desktop-wallpaper/196/549/desktop-wallpaper-5-best-one-piece-manga-panels-ranked-anime-narrative-best-one-piece-panels-manga-panel-iphone.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3 className="manga-carousel-caption">One Piece</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
