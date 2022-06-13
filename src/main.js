import "./styles/main.scss"
import LibraryController from "./libraryController";
import LibraryView from "./libraryView";

const VALID_STATES = {
  "idle": 1,
  "editing": 2,
  "adding": 3,
};
let state = VALID_STATES.idle;

async function main() {
  let loaded = false;
  let loadedFunction = (resolve, reject) => {
    if (!loaded) {
      loaded = true;
      resolve("It's loaded!");
      window.removeEventListener("load", loadedFunction);
    }
  };
  await new Promise(loadedFunction);
  const initialBookProperties = [
    {title: "Common Sense Manual", author: "Naseer R.", pageCount: 1, hasRead: false},
    {title: "Apex Guide", author: "Captain Po", pageCount: 100, hasRead: true},
    {title: "Random Book", author: "muna", pageCount: 1000, hasRead: false},
    {title: "Big Book", author: "muna", pageCount: 99999, hasRead: true}
  ];
  LibraryView.register(LibraryController);
  for (let i = 0; i < initialBookProperties.length; ++i) {
    const bookProperties = initialBookProperties[i];
    LibraryController.addBook(bookProperties);
  }
}

main();
