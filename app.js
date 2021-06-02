let formTitle = document.querySelector('#title');
let formAuthor = document.querySelector('#author');
let formSubmit = document.querySelector('#submit');
let form = document.querySelector('form');
// console.log(formTitle);
// console.log(formAuthor);
// console.log(formSubmit);
let myLibrary = [];
function Book(title, author) {
  (this.title = title), (this.author = author);
}
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  myLibrary.push(new Book(formTitle.value, formAuthor.value));
  console.log(myLibrary);
  form.reset();
  console.log(addBookToLibrary());
});

function addBookToLibrary() {
  myLibrary.forEach((element) => {
    let keys = Object.keys(element);
    for (key of keys) {
      console.log(element[key]);
    }
  });
}
console.log(addBookToLibrary());
