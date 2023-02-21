// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };

export const anime = (query) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b9076a1794msh0313b8f4ae9404fp1b23a5jsnfb26084b05be",
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
    },
  };

  return fetch(
    `https://anime-db.p.rapidapi.com/anime?page=1&size=12&search=${query}`,
    options
  );
  // .then(response => response.json())
  // .then(response => {console.log(response)
  // const bookData = response.data.map(book => (
  //     {
  //     bookId: book._id,
  //     authors: book.status || ["No author to display"],
  //     title: book.title,
  //     // description: book.volumeInfo.description,
  //     image: book.image || "",
  //   }
  //   ))
  //   console.log(bookData) })
  // .catch(err => console.error(err));
};
