import Book from "./book";
import LibraryView from "./libraryView";

export default class Library {
  static bookList = [];

  static addBook(newBookProperties) {
    const {title, author, pageCount, hasRead} = newBookProperties;
    const newBook = new Book(title, author, pageCount, hasRead);
    Library.bookList.push(newBook);
    LibraryView.addBook(newBook);
  }

  static removeBook(bookID) {
    Library.bookList = Library.bookList.filter((book) => book.getID() !== bookID);
    LibraryView.removeBook(bookID);
  }

  static editBook(bookID, newProperties) {
    const book = Library.bookList.find(book => book.getID() === bookID);
    const {title, author, pageCount, hasRead} = newProperties;
    book.setAuthor(author);
    book.setTitle(title);
    book.setPageCount(pageCount);
    book.setRead(hasRead);
    LibraryView.updateBook(bookID);
  }
};