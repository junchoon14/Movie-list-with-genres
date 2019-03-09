(function () {
  const genresData = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const genresList = document.querySelector('#genres-list')
  const genresPanel = document.querySelector('#genres-panel')
  const le = Object.keys(genresData).length
  const data = []
  const genresKeys = Object.keys(genresData)
  const genresValues = Object.values(genresData)

  axios
    .get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      const movies = data.filter(item => item.genres.some(item => item === 1))
      createCardHTML(movies)
    }).catch((err) => console.log(err))

  showMenuFrom(genresData)

  //listen to genres menu
  genresList.addEventListener('click', (event) => {
    const genreId = event.target.dataset.id
    showSelectedItem(event)
    if (data.some(item => item.genres.some(item => item === Number(genreId)))) {
      showMovies(event)
    } else {
      genresPanel.innerHTML = ''
    }
  })

  /////////////////////////////////////////////////////////////

  function showMenuFrom(list) {
    let htmlContent = ''
    for (let i = 1; i <= le; i++) {
      i = i.toString()
      htmlContent += `
    <li class="list-group-item" style="cursor: pointer;" data-id="${i}">${list[i]}</li>
  `
    }
    genresList.innerHTML = htmlContent
    genresList.firstElementChild.classList.add('active')
  }

  function showMovieGenres(movie) {

    return htmlContent
  }

  function createCardHTML(list) {
    let htmlContent = ''
    list.forEach(function (item, index) {
      htmlContent += `
       <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <h6 class="card-title m-2">${item.title}</h6>
            <div class="genres-title pl-1">
              `
      for (let num of item.genres) {
        num = num.toString()
        for (let key of genresKeys) {
          if (key === num) {
            htmlContent += `
              <p class="p-1 m-1 bg-light text-secondary"><small>${genresValues[key - 1]}</small></p>
          `
          }
        }
      }

      htmlContent += `
            </div>
          </div>
        </div>
        `
    })
    genresPanel.innerHTML = htmlContent
  }

  function showMovies(event) {
    const genreId = event.target.dataset.id
    const movies = data.filter(item => item.genres.some(item => item === Number(genreId)))
    createCardHTML(movies)
  }

  function showSelectedItem(event) {
    const activeItem = event.target
    const items = genresList.children
    if (activeItem.classList.contains('active')) return
    for (let item of items) {
      item.classList.remove('active')
    }
    activeItem.classList.add('active')
  }
})()