let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const makeEl = el => document.createElement(el)
const toyCollection = document.querySelector('#toy-collection')
const inputBttn = document.querySelector('input.submit')
const toyForm = document.querySelector('.add-toy-form')
function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(allToys => {
    allToys.forEach(toy => renderToy(toy))
  })
}

function renderToy(toy) {
  console.log('hi')
  console.log(toy)
  
  //create the Elements
  const createDiv = makeEl('div')
  const createName = makeEl('h2')
  const createImg = makeEl('img')
  const createP = makeEl('p')
  const createBttn = makeEl('button')

  //add the attributes to the elements
  createDiv.className = 'card'
  createName.textContent = `${toy.name}`
  createImg.src = toy.image
  createImg.className = 'toy-avatar'
  createP.textContent = toy.likes
  createBttn.className = 'like-btn'
  createBttn.id = toy.id
  createBttn.textContent = 'Like ❤️'
  
  //append toy to collection
  createDiv.append(createName, createImg, createP, createBttn)
  toyCollection.append(createDiv)
  //console.log(createDiv)
}


function submitForm(e) {
  e.preventDefault()
  const nameInput = toyForm[0]
  const imgInput = toyForm[1]
  nameInput.textContent = `${e.target.name}`
  imgInput.textContent = `${e.target.image}`
  
}

function postFunc() { 
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: 'name',
      img: 'img',
      likes: 0
    })
  })
  toyForm.addEventListener('submit', submitForm)
}
getAllToys()
