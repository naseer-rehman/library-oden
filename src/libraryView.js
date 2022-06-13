import BookCard from "./bookCard";

export default class LibraryView {
  static bookCardMap = new Map();
  static controller = null;

  static register(controller) {
    LibraryView.controller = controller;
  }

  static render(books) {
    for (let book in books) {
      const bookID = book.getID();
      if (!(bookCardMap.has(bookID)) || !(bookCardMap.get(bookID))) {
        // Create a new DOM element and stuff.
        
      }
    }
  }

  static removeBook(bookID) {
    console.log(`Removing book ${bookID}`);
    if (!LibraryView.bookCardMap.has(bookID)) {
      console.error(`Book is already removed from DOM (id ${bookID})`);
    }
    console.log(`\tRemoving from DOM`);
    LibraryView.bookCardMap.get(bookID).removeDOM();
    console.log(`\tRemoving from Map`);
    LibraryView.bookCardMap.delete(bookID);
  }

  static addBook(book) {
    if (LibraryView.bookCardMap.has(book.getID())) {
      console.error(`Book already exists (id ${book.getID()})`);
      return;
    }
    const newBookCard = new BookCard(book);
    const editButton = newBookCard.getEditButton();
    const deleteButton = newBookCard.getDeleteButton();
    let editFunction, deleteFunction;
    editFunction = () => {
      // Open the form to start edit
      // If a book is already being edited
      //    Populate the fields appropriately
      //    Replace the event connections for the cancel/submit form buttons
      //      -> with connections to edit this book
      // If a book is not already being edited
      //    Open the form and populate the fields appropriately
      // If the form is already open
      //    Populate the fields appropriately
    };
    deleteFunction = () => {
      LibraryView.controller.deleteBook(book.getID());
      deleteButton.removeEventListener("click", deleteFunction);
      editButton.removeEventListener("click", editFunction);
    };
    editButton.addEventListener("click", editFunction);
    deleteButton.addEventListener("click", deleteFunction);
    LibraryView.bookCardMap.set(book.getID(), newBookCard);
    newBookCard.insertDOM();
  }

  static editBook(bookID, newProperties) {

  }
};
