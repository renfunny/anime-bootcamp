export const getSavedAnimeIds = () => {
  const savedAnimeId = localStorage.getItem('saved_anime')
    ? JSON.parse(localStorage.getItem('saved_anime'))
    : [];

  return savedAnimeId;
};

export const saveAnimeIds = (animeIdArr) => {
  if (animeIdArr.length) {
    localStorage.setItem('saved_anime', JSON.stringify(animeIdArr));
  } else {
    localStorage.removeItem('saved_anime');
  }
};

export const removeAnimeId = (animeId) => {
  const savedAnimeId = localStorage.getItem('saved_anime')
    ? JSON.parse(localStorage.getItem('saved_anime'))
    : null;

  if (!savedAnimeId) {
    return false;
  }

  const updatedSavedAnimeIds = savedAnimeId?.filter((savedBookId) => savedBookId !== animeId);
  localStorage.setItem('saved_anime', JSON.stringify(updatedSavedAnimeIds));

  return true;
};
