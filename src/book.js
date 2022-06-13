import { v4 as uuidv4 } from 'uuid';

export default class Book {
  /**
   * Constructs a new Book with the given properties.
   * @param {string} title 
   * @param {string} author 
   * @param {Integer} pageCount 
   * @param {boolean} read 
   */
  constructor(title, author, pageCount, read) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.read = read;
    this.id = uuidv4();
  }

  getID() {
    return this.id;
  }

  getAuthor() {
    return this.author;
  }

  getTitle() {
    return this.title;
  }

  getPageCount() {
    return this.pageCount;
  }

  hasRead() {
    return this.read;
  }

  setAuthor(newAuthor) {
    this.author = newAuthor;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  setPageCount(newPages) {
    this.pageCount = newPages;
  }

  setRead(read) {
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
};