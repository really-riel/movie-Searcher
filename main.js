const searchBtn = document.querySelector(".search_btn");
const searchInput = document.querySelector(".search_input");
const movieContainer = document.querySelector(".movies_container");
const searchResult = document.querySelector(".searchResult");
const moreButton = document.querySelector(".more");
const movieDetails = document.querySelector(".movie_details");
const closeBtn = document.querySelector(".close_btn");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4dd18b5a0fmsh131c87af423048bp15ab0bjsn8d0f85b061a3",
    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  },
};

searchBtn.addEventListener("click", () => {
  const searchInputText = searchInput.value.trim();
  if (!searchInputText) return;

  fetch(
    `https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchInputText}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.d);

      if (data.d) {
        let html = `<p>Search result:</p> `;
        searchResult.innerHTML = html;
        data.d.forEach((movie) => {
          if (movie.y === undefined) return;
          const movies = `
            
            <div class="image" id="${movie.id}">
                <img
                    src="${movie.i.imageUrl}"
                        alt=""
                    srcset=""
                />
                
                <ul>
                    <li>${movie.l}</li>
                    <li>${movie.y}</li>
                    <li><a href="" class="more">more...</a></li>
                </ul>
            </div>`;
          movieContainer.innerHTML += movies;
        });
      } else if (data.d === []) {
        const word = `Sorry couldn't find anything on ${searchInput}`;
        movieContainer.innerHTML = word;
      }
    })
    .catch((err) => console.error(err));
});

movieContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("more")) return;
  const imageDivId = document.querySelector(".image");
  console.log(imageDivId.id);
  fetch(
    `https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${imageDivId.id}&currentCountry=US`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const title = data.title.title;
      const movieType = data.title.titleType;
      const rating = data.ratings.rating;
      const genre = data.genres;
      const summary = data.plotSummary.text;
      let html = `
        
            <div class="close_btn_container">
                <button class="close_btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="movieContent">
                <h3>${title}</h3>

                <ul>
                    <li>Type: ${movieType}</li>
                    <li>Ratings: ${rating}</li>
                    <li>Genre: ${genre}</li>
                    <li>Summary: ${summary}</li>
                </ul>
            </div>
        `;

      movieDetails.innerText = html;
      movieDetails.classList.add("showDetails");
    })
    .catch((err) => console.error(err));
});

movieDetails.addEventListener("click", (e) => {
  if (e.target.classList.contains("fas")) {
    movieDetails.classList.remove("showDetails");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
