//declaracion de variables 
const totalPersonajes = document.getElementById('total-personajes');
const root = document.getElementById('root');
const carga = document.getElementById('contenedor');
// variable genero y filtrados
const mujeres = document.getElementById('mujeres')
const hombres = document.getElementById('hombres')
const todos = document.getElementById('todos')

// variable  navegador por paginas 

const paginaActual = document.getElementById('pagina-actual')
const nextPage = document.getElementById('next-page')
const totalPaginas = document.getElementById('total-paginas')

const firstPage = document.getElementById('first-page')
const previusPage = document.getElementById('previus-page')
const lastPage = document.getElementById('last-page')



let data = {};
let pagina = 1;
let total = 0;
// para filtrados y resultado
const getData = async () => {
  const url = `https://rickandmortyapi.com/api/character?page=${pagina}`
  const response = await fetch(url)
  const json = await response.json();
  total = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total
  printData(json.results)
//retomar
  updatePagination()
  data = json;
  return json;
}
//devuelve carta con contenido y personaje 


const printData = arr => {
  let card = '';
  totalPersonajes.innerHTML = arr.length
  arr.forEach((personaje) => {
    
    card = card + `
    <div class="col s12 m6 l3">
      <div class="card">
        <div class="card-image">
          <img src=${personaje.image}>
        </div>
        <div class="card-content">
          <p>Nombre: ${personaje.name}</p>
          <p>Genero: ${personaje.gender}</p>
          <p>Species: ${personaje.species}</p>
          <p>Status: ${personaje.status}</p>
          <p>Origin: ${personaje.origin.name}</p>
          <p>Location: ${personaje.location.name}</p>
        </div>
      </div>
    </div>`
  })
  root.innerHTML = card;
}

const pagination = async promesa => {
  const result = await promesa
  nextPage.addEventListener('click', () => {
    pagina += 1;
    getData()
  })
  previusPage.addEventListener('click', () => {
    pagina -= 1;
    getData()
  })
  lastPage.addEventListener('click', () => {
    if(pagina < result.info.pages){
      pagina = result.info.pages
      getData()
    }
  })
  firstPage.addEventListener('click', () => {
    if(pagina > 2){
      pagina = 1;
      getData()
    }
  })
}

const updatePagination = () => {
  if(pagina <= 1){
    previusPage.disabled = true;
    firstPage.disabled = true;
  } else {
    previusPage.disabled = false;
    firstPage.disabled = false;
  }
  if(pagina === total ){
    nextPage.disabled = true
    lastPage.disabled = true
  } else {
    nextPage.disabled = false
    lastPage.disabled = false
  }
}

todos.addEventListener('click', () => {
  const arr = data.results;
  printData(arr)
})

mujeres.addEventListener('click', () => {
  const arr = data.results;
  let arrMujeres = [];
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].gender === 'Female'){
      arrMujeres.push(arr[i])
    }
  }
  printData(arrMujeres)
})

hombres.addEventListener('click', () => {
  const arr = data.results;
  const arrHombres = arr.filter(personaje => personaje.gender === 'Male')
  printData(arrHombres)
})




pagination(getData())