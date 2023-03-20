const bookContainer = document.querySelector(".container");
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const form = document.querySelector(".form");
const closeModal = document.querySelector(".close-button");

let myLibrary = [];

if (bookContainer.innerHTML === "") {
  const empty = document.createElement("p");
  empty.classList.add("empty-message");
  empty.textContent = "Library is empty!";
  bookContainer.appendChild(empty);
}

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

form.addEventListener("submit", (e) => {
  addBookToLibrary();
  displayBooks(myLibrary);
});

bookContainer.addEventListener("click", (event) => {
  deleteBook(event);
});

bookContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("ifReadButton")) {
    const index = event.target.getAttribute("data");
    myLibrary[index].toggleIfRead();
  }
});

function Book(title, author, pages, ifread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.ifread = ifread;
}

Book.prototype.toggleIfRead = function () {
  if (this.ifread === "no") {
    this.ifread = "yes";
  } else if (this.ifread === "yes") {
    this.ifread = "no";
  }
  displayBooks(myLibrary);
};

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "no");

// const starWars = new Book("Star Wars", "George Lucas", 512, "yes");

function deleteBook(event) {
  if (event.target.classList.contains("deleteButton")) {
    const index = event.target.getAttribute("data");
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  }
  if (bookContainer.innerHTML === "") {
    const empty = document.createElement("p");
    empty.classList.add("empty-message");
    empty.textContent = "Library is empty!";
    bookContainer.appendChild(empty);
  }
}

function addBookToLibrary() {
  const title = form.elements["title"];
  const author = form.elements["author"];
  const pages = form.elements["pages"];
  const ifread = form.elements["ifread"];
  let bookTitle = title.value;
  let bookAuthor = author.value;
  let bookPages = pages.value;
  let bookIfread = ifread.value;
  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookIfread);
  myLibrary.push(newBook);
}

function displayBooks(arr) {
  if (bookContainer.innerHTML !== "") {
    bookContainer.innerHTML = "";
  }
  for (const [index, item] of arr.entries()) {
    const div = document.createElement("div");
    div.classList.add("book-card");

    const title = document.createElement("p");
    title.textContent = `Title: ${item.title}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${item.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${item.pages}`;

    const ifread = document.createElement("p");
    ifread.textContent = `Read: ${item.ifread}`;
    const ifReadToggle = document.createElement("button");
    ifReadToggle.classList.add("ifReadButton");
    ifReadToggle.setAttribute("data", `${index}`);
    ifReadToggle.textContent = "Change";
    ifread.appendChild(ifReadToggle);

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(ifread);

    bookContainer.appendChild(div);

    const deleteBook = document.createElement("button");
    deleteBook.setAttribute("data", `${index}`);
    deleteBook.classList.add("deleteButton");
    deleteBook.textContent = "DELETE BOOK";
    div.appendChild(deleteBook);
  }
}
