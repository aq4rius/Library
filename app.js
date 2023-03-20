function Book(title, author, pages, ifread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.ifread = ifread;
  this.reportBook = function () {
    return `${title} by ${author}, ${pages} pages, ${ifread}`;
  };
}

const theHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  295,
  "not read yet."
);

const starWars = new Book("Star Wars", "George Lucas", 512, "already read.");

console.log(theHobbit.reportBook());
console.log(starWars.reportBook());
