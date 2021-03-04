// Fetch / Data 
function getAllDogImg() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(dogs => dogs.message.forEach(dogImg => buildImg(dogImg)))
}
getAllDogImg()

function getAllDogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        let select = document.querySelector("select")
        select.addEventListener("change", (e) => handleFilter(e, data))
        Object.entries(data.message).forEach(breed => buildDogBreeds(breed))
    })
}
getAllDogBreeds()

// Dom
function buildImg(dog){
    let container = document.querySelector('#dog-image-container')
    let img = document.createElement('img')
    img.src = dog
    img.style.width = "200px"
    container.appendChild(img)
}   

function buildDogBreeds(breed){
    let container = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    let ul = document.createElement('ul')
    li.textContent = breed[0]
    breed[1].forEach(subBreed => {
        let subLi = document.createElement("li")
        subLi.textContent = subBreed
        ul.appendChild(subLi)
    })
    li.addEventListener('click', (e) => changeColor(e,li) )
    li.appendChild(ul)
    container.appendChild(li)
}

//handlers
function handleFilter(e, dogs){
    let filter = Object.entries(dogs.message).filter(breed => breed[0]
    .startsWith(e.target.value))
    let container = document.querySelector("#dog-breeds")
    container.innerHTML = ''
    filter.forEach(breed => buildDogBreeds(breed))
}

function changeColor(e,li){
    li.style.color = 'red'
}