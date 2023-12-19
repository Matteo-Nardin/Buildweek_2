



if (location.pathname.split('/').pop() == 'index.html') {
    
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector(".saluto").innerText = saluto();


        const searchAnchor = document.querySelector('#searchAnchor');
        const searchForm = document.createElement('div');
        searchForm.id = 'searchForm';
        searchForm.style.display = 'none'; // Inizialmente nascosto
    
        searchForm.innerHTML =` 
            <form>
                <input type="text" id="searchInput" class="form-control" placeholder="Cerca...">
                <button type="submit" class="btn btn-primary mt-2">Cerca</button>
            </form>`
        ;
    
        // Aggiungi il form dopo l'ancora di ricerca
        searchAnchor.parentNode.insertBefore(searchForm, searchAnchor.nextSibling);
    
        searchAnchor.addEventListener('click', function(event) {
            event.preventDefault(); 
    
            // Mostra o nascondi il form di ricerca quando viene cliccato
            if (searchForm.style.display === 'none') {
                searchForm.style.display = 'block';
            } else {
                searchForm.style.display = 'none';
            }
        });
    
        // Gestisci la ricerca quando viene inviata
        searchForm.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault(); 
    
            const query = document.querySelector('#searchInput').value.trim();
            // Esegui qui la logica per la ricerca utilizzando la query inserita
            console.log('Ricerca per:', query);
        });
    });
    // Aggiungiamo il saluto a un elemento con id "saluto" (possiamo modificare anche dopo)
   
    
}

       
       

if (location.pathname.split('/').pop() == 'henry.html') {
    document.addEventListener('DOMContentLoaded', () =>  {
        const urlparam = new URLSearchParams(location.search);
        const id= urlparam.get('id');
        showAlbum(75621062);
        
        document.querySelector('.bi-arrow-down-circle').addEventListener('click', () => { 
            document.querySelector('.bi-arrow-down-circle').classList.toggle('text-success');
        });
        
    });
    
}


if (location.pathname.split('/').pop() == 'artists.html') {
    document.addEventListener('DOMContentLoaded', () =>  {
        const urlparam = new URLSearchParams(location.search);
        const id= urlparam.get('id');
        showArtist(454);
        
        document.querySelector('.songsArea').addEventListener('click', (e)=> {
            if(e.target.innerText == 'VISUALIZZA ALTRO') {
                let h= parseInt(document.querySelector('.popolari').style.height);
                document.querySelector('.popolari').style.height= h + h + 'px';
                e.target.innerText == 'VISUALIZZA MENO'
            } else if(e.target.innerText == 'VISUALIZZA MENO') {
                let h= parseInt(document.querySelector('.popolari').style.height);
                document.querySelector('.popolari').style.height= h - h + 'px';
                e.target.innerText == 'VISUALIZZA ALTRO';
            }
        })
    });
}


let audio= document.createElement('audio');
let lcsong = JSON.parse(localStorage.getItem('song'));
let lcsongs = JSON.parse(localStorage.getItem('songs'));
let trackNo = 0;
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length>0) {
        document.querySelector('.playbar').classList.remove('d-none');
        playBarSong(lcsong);
        audio.pause();
    };

    document.querySelector('.bi-play-circle').addEventListener('click', () => {
        document.querySelector('.bi-pause-circle').classList.remove('d-none');
        document.querySelector('.bi-play-circle').classList.add('d-none');
    });
        
    document.querySelector('.bi-pause-circle').addEventListener('click', () => { 
        document.querySelector('.bi-pause-circle').classList.add('d-none');
        document.querySelector('.bi-play-circle').classList.remove('d-none');
    });
    document.querySelector('.bi-heart-fill').addEventListener('click', () => { 
        document.querySelector('.bi-heart-fill').classList.toggle('text-danger');
    });
    document.querySelector('.songsArea').addEventListener('click', (e) => {
        // if (e.target.classList.contains('track')) {
        //     // fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${e.target.id}`).then(response => response.json())
        //     // .then(json => {
        //     //     console.log(json);
        //     //     localStorage.setItem('song', JSON.stringify(json));
        //     //     playBarSong(JSON.parse(localStorage.getItem('song')));
        //     //     document.querySelector('.playbar .bi-play-circle').classList.add('d-none');
        //     //     document.querySelector('.playbar .bi-pause-circle').classList.remove('d-none');
        //     //     audio.play();
        //     // })
        //     // .catch(console.error());

        // }
        localStorage.setItem('song', JSON.stringify(lcsongs.filter((ele, i) => ele.title == e.target.innerText)));
        playBarSong(lcsong);
        document.querySelector('.playbar .bi-play-circle').classList.add('d-none');
        document.querySelector('.playbar .bi-pause-circle').classList.remove('d-none');
        audio.play();
    })
 })
    

playBarSong = (obj) => {
    audio.src='';
    document.querySelector('.imageCover').src= obj.album.cover_small;
    document.querySelector('.pbCanzone').innerText = obj.title_short;
    document.querySelector('.pbArtista').innerText = obj.artist.name;
    document.querySelector('.songLength').innerText = Math.floor(obj.duration/60) + ':'+ Math.floor(obj.duration % 60);
    audio.src = obj.preview;
    document.querySelector('.playbar').addEventListener('click' , (e) => {
        if (e.target.classList.contains('bi-play-circle')) {
            e.target.classList.add('d-none');
            document.querySelector('.playbar .bi-pause-circle').classList.remove('d-none');
            audio.play();
        } else if (e.target.classList.contains('bi-pause-circle')) {
            audio.pause();
            e.target.classList.add('d-none');
            document.querySelector('.playbar .bi-play-circle').classList.remove('d-none');
        }
        else if (e.target.classList.contains('bi-repeat')) {
            e.target.classList.toggle('text-success');
            if ( e.target.classList.contains('text-success')) {
                audio.loop = true;
            } else {
                audio.loop = false;
            }
        } else if (e.target.classList.contains('skip-end-fill')) {
            let nextsong= lcsongs.findIndex(obj.title_short)+1;
            localStorage.setItem('song', JSON.stringify(lcsongs.filter((ele, i) => i= nextsong)));
            
        }
    })
    audio.addEventListener('timeupdate', () =>  {
        document.querySelector('.songTime').innerText = '0:' + Math.floor(audio.currentTime);
        document.querySelector('.progress div').style.width = audio.currentTime +'%';
    })

}





showAlbum = async (albumId) => {
    let url = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
    try { 
        const response = await fetch(url, {method: 'GET'})
        const res = await response.json();
        console.log(res);
        document.querySelector('.albumNameArea').innerHTML = '';
        let album = `
        <div class='col-12 col-md-4 m-md-0'>
            <img src="${res.cover_xl}" alt='${res.title_short} album cover photo' class="w-100 h-100">
        </div>
        <div class="col-12 col-md-8 mt-5 pt-5 d-flex flex-column">
            <p class="d-none d-md-block ">${res.type.toUpperCase()}</p>
            <h1 class="fw-bolder mb-5">${res.title}</h1>
            <div class="d-flex flex-column flex-md-row align-items-baseline justify-self-bottom" >
                <p> <img class="rounded-circle me-3" width="50px" height="50px" src="${res.artist.picture_small}" alt="${res.artist.name}'s picture">${res.artist.name}</p>
                <p>· ${res.release_date.slice(0, 4)} · ${res.nb_tracks} brani,<span class="text-white-50"> ${Math.floor(res.duration/60)} min ${res.duration % 60} sec. </span>
            </div>
        </div>`    
        document.querySelector('.albumNameArea').innerHTML += album;
        localStorage.setItem('songs' , JSON.stringify(res.tracks.data));
        res.tracks.data.forEach((brano, i) => {
            let track =  ` 
            <div class="d-none d-md-block col-md-1 text-center cursor-pointer"> ${i+1} </div>
            <div class="col-11 col-md-5">
                <p class="m-0 fw-bold ${brano.type}" id='${brano.id}'>${brano.title}</p>
                <p class="text-white-50 m-0">${brano.artist.name}</p>
            </div>
            <div class="d-none d-md-block col-md-3 text-end">${brano.rank}</div>
            <div class="d-none d-md-block col-md-3 text-end"> ${Math.floor(brano.duration/60)} min ${brano.duration % 60} sec. </div>
            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" class="col-1 d-md-none text-end"><i class="bi bi-three-dots-vertical"></i></a>`
            document.querySelector('.songsArea').innerHTML += track;
        });
        document.querySelector('.albumArea').addEventListener('click', (e) => {
            if (e.target.innerText == res.artist.name) {
                location.href = 'artists.html?artistId='+ res.artist.id;
            }
        })
        
    } catch(error) {
        console.error(error);
    }
    
}

showArtist = async (artistId) => {
    let url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`
    try { 
        const response = await fetch(url, {method: 'GET'})
        const res = await response.json();
        console.log(res);
        document.querySelector(('.artistNameArea')).innerHTML = `
        <img src="${res.picture_big}" class="card-img rounded-0" height='600px' alt="${res.name}'s picture">
        <div class="card-img-overlay d-flex flex-column justify-content-between">
            <div>
                <i class="bi bi-arrow-left px-2 d-md-none fs-2 bg-body-tertiary bg-opacity-50 rounded-circle"></i>
            </div>
            <div>
                <p class="m-0 d-none d-md-block"><i class="text-primary bi bi-patch-check-fill"></i> Artista verificato</p>
                <h5 class="card-title h1 fw-bolder">${res.name}</h5>
                <p class="card-text d-none d-md-inline-block">${res.nb_fan}</p> <span class="d-none d-md-inline">ascoltatori mensili</span>
            </div>
        </div>`
        
        
        document.querySelector('.other').innerText = res.nb_fan;
        document.querySelector('.pfp').src = res.picture_small;
        document.querySelector('.miPiace .artistName').innerText = res.name;
        
        fetch(res.tracklist, {method: 'GET'}).then(response => response.json()).then(json => {
            console.log(json);
            localStorage.setItem('songs' , JSON.stringify(json.data));
            json.data.forEach((obj, i) => {
                if(i<10) {
                    let lista =`
                    <div class="col-11 col-md-6 d-flex align-items-center">
                        <p class="me-3">${i+1}</p>
                        <div class="ms-3 ">
                            <p class="m-0 ${obj.type}" id='${obj.id}'>${obj.title}</p>
                            <p class="m-0 text-white-50 d-md-none "> ${obj.rank}</p>
                        </div>
                        </div>
                        <div class="col-md-3 d-none d-md-block text-white-50">${obj.rank}</div>
                        <div class="col-md-2 d-none d-md-block text-center text-white-50"> ${Math.floor(obj.duration/60)} : ${obj.duration % 60}</div>
                        <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" class="col-1 text-end"><i class="bi bi-three-dots"></i></a>
                    </div>`
                    document.querySelector('.popolari').innerHTML +=lista;
                }
            })
        })
    } catch(error) {
        console.error(error);
    }
}

saluto = () => {  
    // Otteniamo l'ora corrente con il metodo date
    let oraCorrente = new Date().getHours();

    // Troviamo il saluto in base all'ora corrente
    let saluto;

    //condizione per verificare l'ora corrente e messaggio da stampare
    if (oraCorrente >= 4 && oraCorrente < 13) {
        return "Buongiorno";
    } else if (oraCorrente >= 13 && oraCorrente < 18) {
        return "Buon pomeriggio";
    } else {
        return "Buona sera";
    }
}