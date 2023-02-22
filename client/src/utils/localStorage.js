// export const getSavedBookIds = () => {
//   const savedBookIds = localStorage.getItem('saved_books')
//     ? JSON.parse(localStorage.getItem('saved_books'))
//     : [];

//   return savedBookIds;
// };

// export const saveBookIds = (bookIdArr) => {
//   if (bookIdArr.length) {
//     localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
//   } else {
//     localStorage.removeItem('saved_books');
//   }
// };

// export const removeBookId = (bookId) => {
//   const savedBookIds = localStorage.getItem('saved_books')
//     ? JSON.parse(localStorage.getItem('saved_books'))
//     : null;

//   if (!savedBookIds) {
//     return false;
//   }

//   const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
//   localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

//   return true;
// };
export const getSavedAnimeIds = () => {
  const savedAnimeIds = localStorage.getItem("saved_animes")
    ? JSON.parse(localStorage.getItem("saved_animes"))
    : [];

  return savedAnimeIds;
};

export const saveAnimeIds = (animeIdArr) => {
  if (animeIdArr.length) {
    localStorage.setItem("saved_animes", JSON.stringify(animeIdArr));
  } else {
    localStorage.removeItem("saved_animes");
  }
};

export const removeAnimeId = (animeId) => {
  const savedAnimeIds = localStorage.getItem("saved_animes")
    ? JSON.parse(localStorage.getItem("saved_animes"))
    : null;

  if (!savedAnimeIds) {
    return false;
  }

  const updatedSavedAnimeIds = savedAnimeIds?.filter(
    (savedAnimeId) => savedAnimeId !== animeId
  );
  localStorage.setItem("saved_animes", JSON.stringify(updatedSavedAnimeIds));

  return true;
};

export const getSavedMangaIds = () => {
  const savedMangaIds = localStorage.getItem("saved_mangas")
    ? JSON.parse(localStorage.getItem("saved_mangas"))
    : [];

  return savedMangaIds;
};

export const saveMangaIds = (mangaIdArr) => {
  if (mangaIdArr.length) {
    localStorage.setItem("saved_mangas", JSON.stringify(mangaIdArr));
  } else {
    localStorage.removeItem("saved_mangas");
  }
};

export const removeMangaId = (mangaId) => {
  const savedMangaIds = localStorage.getItem("saved_mangas")
    ? JSON.parse(localStorage.getItem("saved_mangas"))
    : null;

  if (!savedMangaIds) {
    return false;
  }

  const updatedSavedMangaIds = savedMangaIds?.filter(
    (savedMangaId) => savedMangaId !== mangaId
  );
  localStorage.setItem("saved_mangas", JSON.stringify(updatedSavedMangaIds));

  return true;
};