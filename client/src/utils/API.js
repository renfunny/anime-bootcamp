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
};

export const manga = (query) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  };

  return fetch(
    `https://kitsu.io/api/edge/manga?page[limit]=12&filter[text]=${query}`,
    options
  );
};

