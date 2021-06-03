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
let formRemove = document.querySelectorAll('.remove');
let ball = document.querySelectorAll('.ball-container');
let mainContainer = document.querySelector('.main');
let card = document.querySelector('.card');
ball.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    let parent = element.parentElement;
    if (element.style.justifyContent == 'flex-end') {
      element.style.justifyContent = 'flex-start';
      parent.style.background = 'var(--orange)';
    } else {
      element.style.justifyContent = 'flex-end';
      parent.style.background = 'var(--grey)';
    }
  });
});

formRemove.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    let parent = element.parentElement;
    parent.remove();
  });
});

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
      ballContainer.style.justifyContent = 'flex-end';
      cardContainer.style.background = 'var(--orange)';
    } else if (this.read == 'not-read') {
      ballContainer.style.justifyContent = 'flex-start';
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
  }
}

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  myLibrary.push(
    new Book(
      formTitle.value,
      formAuthor.value,
      formPage.value,
      formLog.value,
      formStatus.value
    )
  );
  console.log(myLibrary);
  form.reset();
  myLibrary.forEach((element) => {
    return element.addBookToLibrary();
  });
  form.classList.remove('center');
  body.style.setProperty('--blur', null);
});
