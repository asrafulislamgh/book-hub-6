const searchField = document.getElementById("search-field");
searchField.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("search-btn").click();
  }
});

const loadBook = () => {
  const searchText = document.getElementById("search-field");
  const url = `https://openlibrary.org/search.json?q=${searchText.value}`;
  searchText.value = "";
  const divContainer = document.getElementById("div-container");
  divContainer.innerHTML = "";
  document.getElementById("search-result-found").style.display = "none";
  document.getElementById("spinner").classList.remove("d-none");
  fetch(url)
    .then((response) => response.json())
    .then((data) => searchBook(data));
};
const searchBook = (data) => {
  const books = data.docs;
  const divContainer = document.getElementById("div-container");
  divContainer.innerHTML = "";
  document.getElementById(
    "search-result-found"
  ).innerText = `Total found: ${data.numFound} items`;
  document.getElementById("search-result-found").style.display = "block";
  if (data.numFound === 0) {
    document.getElementById("spinner").classList.add("d-none");
  }
  books.forEach((book) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="col">
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${
                  book.cover_i
                }-L.jpg" class="card-img-top" alt="...">
                <div class="card-body text-start">
                    <h5 class="card-title">${
                      book.title ? book.title : "Not Given"
                    }</h5>
                    <p class="card-text">Author: <b>${
                      book.author_name ? book.author_name : "Not Given"
                    }</b></p>
                    <p class="card-text">First Publication: <b>${
                      book.first_publish_year
                        ? book.first_publish_year
                        : "Not Given"
                    }</b></p>
                    <p class="card-text text-truncate" title="${
                      book.publisher
                    }">Publisher: <b>${
      book.publisher ? book.publisher : "Not Given"
    }</b></p>
                </div>
            </div>
        </div>
    `;
    divContainer.appendChild(div);
    document.getElementById("spinner").classList.add("d-none");
  });
};
