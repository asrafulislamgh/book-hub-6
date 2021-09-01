const loadBook = () => {
  const searchText = document.getElementById("search-field");
  const url = `http://openlibrary.org/search.json?q=${searchText.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => searchBook(data.docs));
};
const searchBook = (data) => {
  //   console.log(data.docs);
  data.forEach((book) => {
    console.log(book);
  });
};
