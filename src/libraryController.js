import Library from "./library";

export default class LibraryController {
  static deleteBook(bookID) {
    Library.removeBook(bookID);
  }

  static addBook(newBookProperties) {
    Library.addBook(newBookProperties);
  }

  static editBook(bookID, newProperties) {
    console.log("Controller retrieved edit request");
    Library.editBook(bookID, newProperties);
  }
};