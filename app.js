const bookContainer = document.querySelector(".container");
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const form = document.querySelector(".form");
const closeModal = document.querySelector(".close-button");

class MyBooks {
  constructor(title, author, pages, ifread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.ifread = ifread;
  }

  toggleIfRead() {
    if (this.ifread === "no") {
      this.ifread = "yes";
    } else if (this.ifread === "yes") {
      this.ifread = "no";
    }
    myLibrary.displayBooks();
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBookToLibrary(title, author, pages, ifread) {
    const newBook = new MyBooks(title, author, pages, ifread);
    this.books.push(newBook);
  }

  deleteBook(event) {
    if (event.target.classList.contains("deleteButton")) {
      const index = event.target.getAttribute("data");
      this.books.splice(index, 1);
      this.displayBooks();
    }
    if (bookContainer.innerHTML === "") {
      const empty = document.createElement("p");
      empty.classList.add("empty-message");
      empty.textContent = "Library is empty!";
      bookContainer.appendChild(empty);
    }
  }

  displayBooks() {
    if (bookContainer.innerHTML !== "") {
      bookContainer.innerHTML = "";
    }
    for (const [index, item] of this.books.entries()) {
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
}

const myLibrary = new Library();

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

form.addEventListener("submit", () => {
  let bookTitle = form.elements["title"].value;
  let bookAuthor = form.elements["author"].value;
  let bookPages = form.elements["pages"].value;
  let bookIfread = form.elements["ifread"].value;
  myLibrary.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookIfread);
  myLibrary.displayBooks();
});

bookContainer.addEventListener("click", (event) => {
  myLibrary.deleteBook(event);

  if (event.target.classList.contains("ifReadButton")) {
    const index = event.target.getAttribute("data");
    myLibrary.books[index].toggleIfRead();
  }
});

const theHobbit = new MyBooks("The Hobbit", "J.R.R. Tolkien", 295, "no");

const starWars = new MyBooks("Star Wars", "George Lucas", 512, "yes");

myLibrary.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "no");
myLibrary.addBookToLibrary("Star Wars", "George Lucas", 512, "yes");
myLibrary.displayBooks();
