



if (location.pathname.split('/').pop() == 'index.html') {
    document.addEventListener('DOMContentLoaded', () =>  {
        document.querySelector(".saluto").innerText = saluto();
    });
    // Aggiungiamo il saluto a un elemento <h2> con id "saluto" (possiamo modificare anche dopo)
   
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
}

       
       

if (location.pathname.split('/').pop() == 'henry.html') {
    document.addEventListener('DOMContentLoaded', () =>  {
        showAlbum(75621062);
        document.querySelector('.blah .bi-play-circle').addEventListener('click', () => {
            document.querySelector('.blah .bi-pause-circle').classList.remove('d-md-none');
            document.querySelector('.blah .bi-play-circle').classList.add('d-md-none');
        });
            
        document.querySelector('.blah .bi-pause-circle').addEventListener('click', () => { 
            document.querySelector('.blah .bi-pause-circle').classList.add('d-md-none');
            document.querySelector('.blah .bi-play-circle').classList.remove('d-md-none');
        });
        document.querySelector('.blah .bi-heart-fill').addEventListener('click', () => { 
            document.querySelector('.blah .bi-heart-fill').classList.toggle('text-danger');
        });
        document.querySelector('.blah .bi-arrow-down-circle').addEventListener('click', () => { 
            document.querySelector('.blah .bi-arrow-down-circle').classList.toggle('text-success');
        });
        
    });
    
}


if (location.pathname.split('/').pop() == 'artist.html') {

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
        document.querySelector('.tracklist').innerHTML ='';
        res.tracks.data.forEach((brano, i) => {
            let track =  ` 
            <div class="d-none d-md-block col-md-1 text-center"> ${i+1} </div>
            <div class="col-11 col-md-5">
                <p class="m-0 fw-bold">${brano.title}</p>
                <p class="text-white-50 m-0">${brano.artist.name}</p>
            </div>
            <div class="d-none d-md-block col-md-3 text-end">${brano.rank}</div>
            <div class="d-none d-md-block col-md-3 text-end"> ${Math.floor(brano.duration/60)} min ${brano.duration % 60} sec. </div>
            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" class="col-1 d-md-none text-end"><i class="bi bi-three-dots-vertical"></i></a>`
            document.querySelector('.tracklist').innerHTML += track;
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

