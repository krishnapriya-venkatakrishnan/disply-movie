const wlResults = document.querySelector('#display')

if (localStorage.length)
    document.querySelector('.empty-wl').style.display = 'none'

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.split('-')[0] === 'movie'){
        console.log(key)
        const value = localStorage.getItem(key)   
        const title = key.split('-')[1].trimStart()
        
        const poster = value.split('|')[0]
        const rating = value.split('|')[1]
        const runTime = value.split('|')[2]
        const genre = value.split('|')[3]
        const plot = value.split('|')[4]
        console.log(poster)
        console.log(rating) 
        wlResults.innerHTML += `
            <div class='movie'>
                <div class='m-image'>
                        <img src='${poster}' alt='${title}' />
                </div>
                <div class='m-details'>
                    <div class='m-detail-1'>
                        <p class='title'>${title}</p>
                        <i class="fa-solid fa-star"></i>
                        <p class='rating'>${rating}</p>
                    </div>
                    <div class='m-detail-2'>
                        <p class='running-time'>${runTime}</p>
                        <p class='Genre'>${genre}</p>
                        <button id='${title}' class='watchlist' data-watchlist='${title}'>
                            <i class="fa-solid fa-circle-minus"></i>
                                Remove
                        </button>
                    </div>
                    <div class='m-detail-3'>
                        <p class='plot'>${plot}</p>
                    </div>
                </div>
            </div>
            `
    }
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.watchlist){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.split('-')[1].trimStart() === e.target.dataset.watchlist){
                localStorage.removeItem(key)
                location.reload()
            }
        }
    }
    
})
