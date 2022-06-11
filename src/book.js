import { v4 as uuidv4 } from 'uuid';

export default class Book {
  constructor(title, author, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
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

  getPages() {
    return this.pages;
  }

  isRead() {
    return this.read;
  }

  setAuthor(newAuthor) {
    this.author = newAuthor;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  setPages(newPages) {
    this.pages = newPages;
  }

  setRead(read) {
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
};