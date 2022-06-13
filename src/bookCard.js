const LIBRARY_CONTAINER_ID = "libraryContainer";
const TEMPLATE_BOOK_CARD = "templateBookCard";
export default class BookCard {
  constructor(book) {
    console.log(book);
    this.book = book;
    this.domObject = null;
    const templateBookCard = document.getElementById(TEMPLATE_BOOK_CARD);
    const newBookCard = templateBookCard.cloneNode(true);
    const bookID = book.getID();
    // Reset the ID of the clone DOM element
    newBookCard.removeAttribute("id");
    newBookCard.setAttribute("data-book-id", bookID);
    // Set the attributes of the tags
    const titleLabel = newBookCard.querySelector(".book-title");
    const authorLabel = newBookCard.querySelector(".author-name");
    const pageLabel = newBookCard.querySelector(".page-count");
    const finishedCheckbox = newBookCard.querySelector(".finished-checkbox");
    titleLabel.textContent = book.getTitle();
    authorLabel.textContent = book.getAuthor();
    pageLabel.textContent = book.getPageCount();
    finishedCheckbox.setAttribute("data-value", `${book.hasRead()}`);
    const editButton = newBookCard.querySelector(".edit-button");
    const deleteButton = newBookCard.querySelector(".del-button");
    this.domObject = {
      container: newBookCard,
      editButton: editButton,
      deleteButton: deleteButton,
      titleLabel: titleLabel,
      authorLabel: authorLabel,
      pageLabel: pageLabel,
      finishedCheckbox: finishedCheckbox,
    };
  }

  insertDOM() {
    const libraryContainer = document.getElementById(LIBRARY_CONTAINER_ID);
    libraryContainer.appendChild(this.domObject.container);
  }

  removeDOM() {
    const container = this.domObject.container;
    if (container.parentNode) {
      container.parentNode.removeChild(container);
      // Remove references for GC
      const keys = Object.keys(this.domObject);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        this.domObject[key] = null;
      }
      this.domObject = null;
    } 
  }

  updateInformation() {
    // To update the BookCard with the current attributes of the Book.
  }

  getDeleteButton() {
    return this.domObject.deleteButton;
  }

  getEditButton() {
    return this.domObject.editButton;
  }
};
