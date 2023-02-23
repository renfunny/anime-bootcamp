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
