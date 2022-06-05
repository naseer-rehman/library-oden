import "./styles/main.scss"
import Book from "./book.js";

const VALID_STATES = {
  "idle": true,
  "editing": true,
  "adding": true,
};
let state = "idle";


const library = [
  new Book("Common Sense Manual", "Naseer R.", 1, false),
  new Book("Apex Guide", "Captain Po", 100, true),
  new Book("Random Book", "muna", 1000, false),
  new Book("Big Book", "muna", 99999, true),
];

function onAddBook() {

}

function removeBook() {

}

function renderLibrary() {
  // Clear existing cards (i know it's not optimal but whatever right)
  const libraryContainer = document.getElementById("libraryContainer");

  // Add in new "cards" for each book
  for (let i = 0; i < library.length; ++i) {
    console.log(library[i].getID());
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
  }
}

function main() {
  // renderLibrary();
}

main();
