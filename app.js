let fastAppend = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};
let body = document.querySelector('body');
let formTitle = document.querySelector('#title');
let formAuthor = document.querySelector('#author');
let formPage = document.querySelector('#pages');
let formLog = document.querySelector('#log-date');
let formStatus = document.querySelector('#status');
let formSubmit = document.querySelector('#submit');
let form = document.querySelector('form');
let formOpen = document.querySelector('.form-btn');
let mainContainer = document.querySelector('.main');
formOpen.addEventListener('click', (e) => {
  e.preventDefault();
  if (form.className != 'center') {
    form.className = 'center';
    console.log(form);
    body.style.setProperty('--blur', 'blur(5px)');
  } else {
    form.classList.remove('center');
    body.style.setProperty('--blur', null);
  }
});
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  let newBook = new Book(
    formTitle.value,
    formAuthor.value,
    formPage.value,
    formLog.value,
    formStatus.value
  );
  myLibrary.push(newBook);
  console.log(myLibrary);
  form.reset();
  form.classList.remove('center');
  body.style.setProperty('--blur', null);
  return newBook.addBookToLibrary();
});

let myLibrary = [];
class Book {
  constructor(title, author, page, logDate, read) {
    (this.title = title),
      (this.author = author),
      (this.page = page),
      (this.logDate = logDate),
      (this.read = read);
  }
  addBookToLibrary() {
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('column', 'card');
    let removeBtn = document.createElement('button');
    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt');
    removeBtn.classList.add('remove');
    removeBtn.appendChild(trashIcon);
    let cardTitle = document.createElement('p');
    cardTitle.style.fontSize = '1.2rem';
    cardTitle.textContent = `${this.title}`;
    let cardAuthor = document.createElement('p');
    cardAuthor.textContent = `By: ${this.author}`;
    let cardPageNum = document.createElement('p');
    cardPageNum.textContent = `Number of page: ${this.page}`;
    let cardAddDate = document.createElement('p');
    cardAddDate.textContent = `Log date: ${this.logDate}`;
    let markRead = document.createElement('p');
    markRead.textContent = 'Mark as Read';
    markRead.className = 'read';
    let ballContainer = document.createElement('div');
    ballContainer.className = 'ball-container';
    let ballSpan = document.createElement('span');
    ballSpan.className = 'ball';
    if (this.read === 'read') {
      ballContainer.style.justifyContent = 'flex-start';
      cardContainer.style.background = 'var(--orange)';
    } else if (this.read == 'not-read') {
      ballContainer.style.justifyContent = 'flex-end';
      cardContainer.style.background = 'var(--grey)';
    }
    ballContainer.appendChild(ballSpan);
    fastAppend(
      cardContainer,
      removeBtn,
      cardTitle,
      cardAuthor,
      cardPageNum,
      cardAddDate,
      markRead,
      ballContainer
    );
    mainContainer.appendChild(cardContainer);
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let parent = cardContainer;
      parent.remove();
    });
    ballContainer.addEventListener('click', (e) => {
      e.preventDefault();
      let parent = cardContainer;
      if (ballContainer.style.justifyContent == 'flex-end') {
        ballContainer.style.justifyContent = 'flex-start';
        parent.style.background = 'var(--orange)';
      } else {
        ballContainer.style.justifyContent = 'flex-end';
        parent.style.background = 'var(--grey)';
      }
    });
  }
}
const harryPotter = new Book(
  'Harry Potter',
  'J.k Rowling',
  '223',
  'May 31, 2021',
  'not-read'
);
myLibrary.push(harryPotter);
harryPotter.addBookToLibrary();
