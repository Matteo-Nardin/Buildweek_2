

if (location.pathname.split('/').pop() === 'index.html' ) {
    (saluto = () => {
        // Otteniamo l'ora corrente con il metodo date
        let oraCorrente = new Date().getHours();

        // Troviamo il saluto in base all'ora corrente
        let saluto;

        //condizione per verificare l'ora corrente e messaggio da stampare
        if (oraCorrente >= 4 && oraCorrente < 13) {
            saluto = "Buongiorno";
        } else if (oraCorrente >= 13 && oraCorrente < 18) {
            saluto = "Buon pomeriggio";
        } else {
            saluto = "Buona sera";
        }

        // Aggiungiamo il saluto a un elemento <h2> con id "saluto" (possiamo modificare anche dopo)
        const elementoSaluto = document.querySelector("saluto");
        if (elementoSaluto) {
            elementoSaluto.textContent = saluto;
        } else {
            console.log("Elemento h2 non trovato.");
        }
    })();
}





fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=viola(feat. Salmo)', {method: 'GET'})
.then(response => response.json())
.then(json => {
    console.log(json);
    let album = `
    <img src="${json.data[0].album.cover}" class="img-fluid">
    </div>
    <div class="col-auto col-md-8 mt-4">
        <p class="d-none d-md-block ">ALBUM</p>
        <h1 class="fw-bolder">T</h1>
        <div class="d-flex flex-md-column" >
            <p> <img class="rounded-circle pe-3 align-self-center" src="" alt="">nome artista ·</p>
            <p> anno · num brani,<span class="text-white-50"> min 20 sec. </span>
        </div>
    </div>`    
    })
    .catch(console.error());

