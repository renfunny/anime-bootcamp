import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchAnimes from "./pages/SearchAnimes";
import SavedAnimes from "./pages/SavedAnimes";
import Navbar from "./components/Navbar";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SearchManga from "./pages/SearchManga";
import SavedManga from "./pages/SavedManga";
import TopAnime from "./pages/TopAnime";
import TopManga from "./pages/TopManga";

// const client = new ApolloClient({
//   request: operation => {
//     const token = localStorage.getItem("id_token");

//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ``
//       }
//     });
//   },
//   uri: "/graphql"
// });

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <div>
    //   TEST
    // </div>
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={SearchAnimes} />
            <Route exact path="/saved" component={SavedAnimes} />
            <Route exact path="/searchManga" component={SearchManga} />
            <Route exact path="/savedManga" component={SavedManga} />
            <Route exact path="/topAnime" component={TopAnime} />
            <Route exact path="/topManga" component={TopManga} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
      {/* <div>TEST</div> */}
    </ApolloProvider>
  );
}

export default App;
