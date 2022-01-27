let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getAllToys()
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
toyForm.addEventListener('submit', submitForm)
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
  createBttn.addEventListener('click', () => {
    ++createP.textContent
  })
}


function submitForm(e) {
  //e.preventDefault()
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: e.target.querySelectorAll('input')[0].value,
      imgage: e.target.querySelectorAll('input')[1].value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    renderToy(data)
    toyForm.reset()
  })
}

function updateLikes(e) {
  e.preventDefault()
  fetch(`http://localhost:3000/toys/${e.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: createP.value
    })
  })
  .then(res => res.json())
  .then(data => {
    renderToy(data)
    createDiv.reset()
  })
}

