const API_TOKEN = "13f013459bd70da501c8728dbecb9907";
export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))

}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export async function getFilmDetails(id) {
  const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN;
  return await (await fetch(url)).json();
}