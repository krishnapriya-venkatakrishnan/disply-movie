const keysArray = []
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i).split('-')[1]
    keysArray[i] = key.trimStart()
}
const searchResultsEl = document.querySelector('#display')
    
document.querySelector(".search-btn").addEventListener('click', () => {
    const movieSearch = document.getElementById('movie').value
    
    if (!movieSearch)
        return
    
    fetch(`https://www.omdbapi.com/?apikey=534ff6bc&s=${movieSearch}&type=movie`)
        .then(res => res.json())
        .then(data => {
            
            searchResultsEl.innerHTML = ''
            if(data.Error === 'Movie not found!'){
                document.querySelector('#error').style.display = 'block'
                document.querySelector('#error').textContent = `Unable to find what you're looking for. Please try another search.`
                return
            }
            document.querySelector('#error').style.display = 'none'
            data.Search.forEach(function(sr){ 
                fetch(`https://www.omdbapi.com/?apikey=534ff6bc&t=${sr.Title}`)
                    .then(res2 => res2.json())
                    .then(srData => {
                        let hasAdded = ''
                        if (keysArray.includes(srData.Title)){
                            hasAdded = 'added'
                        }
                        searchResultsEl.innerHTML += `
                        <div class='movie'>
                            <div class='m-image'>
                                <img src='${srData.Poster}' alt='${srData.Title}' />
                            </div>
                            <div class='m-details'>
                                <div class='m-detail-1'>
                                    <p class='title'>${srData.Title}</p>
                                    <i class="fa-solid fa-star"></i>
                                    <p class='rating'>${srData.imdbRating}</p>
                                </div>
                                <div class='m-detail-2'>
                                    <p class='running-time'>${srData.Runtime}</p>
                                    <p class='Genre'>${srData.Genre}</p>
                                    <button id='${srData.Title}' class='watchlist ${hasAdded}' data-watchlist='
                                    ${srData.Title}?${srData.Poster}|${srData.imdbRating}|${srData.Runtime}|${srData.Genre}|${srData.Plot}
                                    '>
                                        <i class="fa-solid fa-circle-plus"></i>
                                        Watchlist
                                    </button>
                                </div>
                                <div class='m-detail-3'>
                                    <p class='plot'>${srData.Plot}</p>
                                </div>
                            </div>
                        </div>
                        `
                    })
            })
            document.querySelector('.no-search').style.display = 'none'
        })
})

function updateLocalStorage(key, value){
    key = `movie-${key}`
    localStorage.setItem(key, value)
}

document.addEventListener('click', (e) => {
    
    if (e.target.id === 'movie')
        console.log('movie')
    
    if (e.target.dataset.watchlist){
        updateLocalStorage(e.target.dataset.watchlist.split('?')[0], e.target.dataset.watchlist.split('?')[1])
        e.target.style.display = 'none'
    }
})