const searchBtn = document.querySelector(".searchBar_button");
const searchInput = document.querySelector(".searchBar_input");
const movieContainer = document.querySelector(".movieContainer");
const searchResult = document.querySelector(".searchResult");
const moreButton = document.querySelector(".more");
const movieDetails = document.querySelector(".movieDetails");
const closeBtn = document.querySelector(".closeBtn");
const movieContent = document.querySelector(".movieContent");

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
  const searchIcon = document.querySelector(".fa-search");
  const spinIcon = document.querySelector(".fa-spin");
  const animateButton = () => {
    searchIcon.classList.toggle("none");
    spinIcon.classList.toggle("block");
    spinIcon.classList.toggle("none");
  };
  animateButton();
  setTimeout(animateButton, 3000);
  console.log(searchBtn);

  fetch(
    `https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchInputText}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.d);
      let movies = "";
      if (data.d) {
        let html = `<p>Search result:</p> `;
        searchResult.innerHTML = html;

        data.d.forEach((movie) => {
          if (movie.y === undefined) return;

          movies += `
            
            <div class="movieDisplay" id="${movie.id}">
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
        });
        movieContainer.innerHTML = movies;
      } else {
        const word = `Sorry couldn't find anything on ${searchInput}`;
        movieContainer.innerHTML = word;
      }
    })
    .catch((err) => console.error(err));
});

movieContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("more")) return;

  const imageDivId = e.target.parentElement.parentElement.parentElement;
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
      let html = "";
      html = `
        
          
            
                <h3>${title}</h3>

                <ul>
                    <li><span>Type:</span> ${movieType}</li>
                    <li><span>Ratings:</span> ${rating}</li>
                    <li><span>Genre:</span> ${genre}</li>
                    <li><span>Summary:</span> ${summary}</li>
                </ul>
           
        `;

      movieContent.innerHTML = html;
      console.log(html);

      movieDetails.classList.add("block");
    })
    .catch((err) => console.error(err));
});

closeBtn.addEventListener("click", (e) => {
  movieDetails.classList.remove("block");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
