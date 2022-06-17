import BookCard from "./bookCard";

let editing = false;
let formOpen = false;
const OPEN_FORM_BUTTON_ID = "openFormButton";
const FORM_CONTAINER_ID = "addBookForm";
const CANCEL_BUTTON_ID = "addBookCancelButton";
const SUBMIT_BUTTON_ID = "addBookSubmitButton";
let submitFunction = null;
let cancelFunction = null;


// Helpers

// Retrieves the DOM elements that contain the user's input
const retrieveFormFields = () => {
  const TITLE_FIELD_ID = "bookNameField";
  const AUTHOR_FIELD_ID = "bookAuthorField";
  const PAGE_COUNT_FIELD_ID = "bookPageCountField";
  const BOOK_READ_CHECKBOX_ID = "bookReadCheckbox";
  const formFields = {
    titleField: document.getElementById(TITLE_FIELD_ID),
    authorField: document.getElementById(AUTHOR_FIELD_ID),
    pageCountField: document.getElementById(PAGE_COUNT_FIELD_ID),
    bookReadCheckbox: document.getElementById(BOOK_READ_CHECKBOX_ID),
  };
  return formFields;
};

const setFormInput = (values) => {
  const {
    titleField, 
    authorField, 
    pageCountField, 
    bookReadCheckbox
  } = retrieveFormFields();
  console.log("\tsetting values...")
  titleField.value = values.hasOwnProperty("title") 
    ? values.title : titleField.value;
  authorField.value = values.hasOwnProperty("author") 
    ? values.author : titleField.value;
  pageCountField.value = values.hasOwnProperty("pageCount") 
    ? values.pageCount : pageCountField.value;
  bookReadCheckbox.checked = values.hasOwnProperty("hasRead") 
    ? values.hasRead : bookReadCheckbox.checked;
};

// Retrieves the information from the form fields entered by the user.
const retrieveFormInput = () => {
  const formFields = retrieveFormFields();
  const formInfo = {
    title: formFields.titleField.value,
    author: formFields.authorField.value,
    pageCount: formFields.pageCountField.value,
    hasRead: formFields.bookReadCheckbox.checked
  };
  return formInfo;
};

// Makes the form visible and hides the open form button.
const clearFormFields = () => {

};

// Opens the form with the given options
const openForm = (options) => {
  const isEditing = options.editing;
  console.log(`Editing? ${isEditing}`)
  const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
  const cancelButton = document.getElementById(CANCEL_BUTTON_ID);
  if (formOpen === false) {
    // Open for the form and hide the open form button
    const formContainer = document.getElementById(FORM_CONTAINER_ID);
    const formOpenButton = document.getElementById(OPEN_FORM_BUTTON_ID);
    formOpenButton.classList.add("hidden");
    formContainer.classList.remove("hidden");
  } else if (formOpen === true) {
    // Remove the previous connections for the submit and cancel buttons
    submitButton.removeEventListener("click", submitFunction);
    cancelButton.removeEventListener("click", cancelFunction);
    cancelFunction = null;
    submitFunction = null;
  }
  if (isEditing === false) {
    setFormInput({title: "", author: "", pageCount: 0, hasRead: false});
    submitButton.textContent = "Add";
    submitFunction = () => {
      const formInfo = retrieveFormInput();
      LibraryView.controller.addBook(formInfo);
      closeForm();
    }
    cancelFunction = () => {
      closeForm();
    };
  } else if (isEditing === true) {
    editing = true;
    submitButton.textContent = "Edit";
    const bookID = options.bookID;
    // Populate the fields
    setFormInput(options.initialProperties);
    submitFunction = () => {
      const formInfo = retrieveFormInput();
      LibraryView.controller.editBook(options.bookID, formInfo);
      closeForm();
    };
    cancelFunction = () => {
      closeForm();
    };
  }
  submitButton.addEventListener("click", submitFunction);
  cancelButton.addEventListener("click", cancelFunction);
  formOpen = true;
};

// Closes the form and resurfaces the open form button.
const closeForm = () => {
  const formOpenButton = document.getElementById(OPEN_FORM_BUTTON_ID);
  const formContainer = document.getElementById(FORM_CONTAINER_ID);
  const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
  const cancelButton = document.getElementById(CANCEL_BUTTON_ID);
  formOpenButton.classList.remove("hidden");
  formContainer.classList.add("hidden");
  submitButton.removeEventListener("click", submitFunction);
  cancelButton.removeEventListener("click", cancelFunction);
  editing = false;
  formOpen = false;
};


export default class LibraryView {
  static bookCardMap = new Map();
  static controller = null;

  static init() {
    const formOpenButton = document.getElementById(OPEN_FORM_BUTTON_ID);
    const submitButton = document.getElementById(SUBMIT_BUTTON_ID);
    const cancelButton = document.getElementById(CANCEL_BUTTON_ID);
    formOpenButton.addEventListener("click", () => {
      // Connect cancel and submit buttons
      openForm({editing: false});
    });
  }

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
      openForm({
        editing: true, 
        bookID: book.getID(),
        initialProperties: {
          title: book.getTitle(), 
          author: book.getAuthor(), 
          pageCount: book.getPageCount(), 
          hasRead: book.hasRead(),
        },
      });
      console.log("bruh");
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

  static updateBook(bookID) {
    const bookCard = LibraryView.bookCardMap.get(bookID);
    bookCard.updateInformation();
  }
};
