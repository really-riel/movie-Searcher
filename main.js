const searchBtn = document.querySelector(".search_btn");
const searchInput = document.querySelector(".search_input");
const movieContainer = document.querySelector(".movies_container");
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
      data.d.forEach((movie) => {
        const movies = `
        <div class="image">
            <img
                src="${movie.i.imageUrl}"
                    alt=""
                srcset=""
            />
            <figcaption>${movie.l}</figcaption>
        </div>`;
        movieContainer.innerHTML += movies;
      });
    })
    .catch((err) => console.error(err));
});
