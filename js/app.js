/*
<div class="col-3">
    <div class="card debug relative">
        <div>
            <img class="absolute pin-center" src="./img/pin.svg" alt="">
        </div>
        <div class="card-wrap d-flex justify-center flex-column align-center p-4 gap-5">
            <div>
                <img class="image" src="https://via.placeholder.com/600/92c952" alt="">
            </div>
            <div class="caption">
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora atque unde non possimus error blanditiis!
                </p>
            </div>
        </div>
    </div>
</div>
*/


// definisco le costanti
const imgOverlay = document.getElementById("imgOverlay");
const overlay = document.getElementById("overlay");
let cardElement;
const button = document.getElementById("button");
const cardContainer = document.getElementById("row-card");
console.log(cardContainer);

//creo la funzione mycreateelement4 che prende come argomento 4 elementi
//il tag dell'html le classi il contenuto e una callback opzionale 
function myCreateElement4(
  tagnName,
  classList = [],
  content = [],
  callback = false
) {
  const el = document.createElement(tagnName); //creo l'elemento html che si deve aggiungere

  if (classList.length > 0) { //controllo se l'argomento classList ha delle classi
    el.classList.add(...classList); //e in caso le aggiungo
  }

  if (callback) { //controllo se la callback mi ritorna undefined(false)
    callback(el); //altrimenti applico la callback all'el
  }

  if (Array.isArray(content)) { //se content è un array
    for (let i = 0; i < content.length; i++) { //allora itero inserendo gli alementi ad el
      el.appendChild(content[i]);
    }
  } else if (content instanceof HTMLElement) { //stessa cosa se è un html element o stringa
    el.appendChild(content);
  } else if (typeof content === "string") {
    el.innerHTML = content;
  } else {
    console.error("Non posso aggiungere l'elemento"); //altrimenti ritorno un errore in console
  }

  return el; //ritorno el come risultato della funzione
}

function toggleOverlay() { //una funzione che quando chiamata aggiunge una classe d-none all'overlay
  overlay.classList.toggle("d-none");
  document.body.classList.toggle("overflow-hidden"); //e una classe overflowhidden al body
}

axios.get("https://picsum.photos/v2/list?page=12&limit=6").then((el) => {
  const data = el.data;
  console.log(el);
  console.log(data); //ottengo gli elementi della chiamata get all'API

  const cardElements = data.map((photo) => { //creo un nuovo array con il metodo map cosi poi da appenderlo una volta che è finito
    return myCreateElement4("div", ["col-3"], [ //aggiungo con la funzione mycreateelement tutti gli elementi html
      myCreateElement4("div", ["card", "relative"], [ //a tutti gli elementi dentro l'array
        myCreateElement4("div", [], [
          myCreateElement4("img", ["absolute", "pin-center"], "", (el) => {
            el.src = "./img/pin.svg";
            el.alt = "pin";
          })
        ]),
        myCreateElement4("div", ["card-wrap", "d-flex", "justify-center", "flex-column", "align-center", "p-4", "gap-5"], [
          myCreateElement4("div", [], [
            myCreateElement4("img", ["image"], "", (el) => {
              el.src = `${photo.download_url}`;
              el.alt = "";
            })
          ]),
          myCreateElement4("div", ["caption"], [
            myCreateElement4("p", [], `${photo.author}`)
          ])
        ])
      ])
    ]);
  });

  cardElements.forEach((card, i) => { //una volta aggiunte le card con l'html vado ad iterare per appenderle 
    console.log(i) //ho definito un i perche tornava undefined e il ciclo for deve lavorare sull'elemento della lista con il giusto index
    console.log(data[i].download_url);
    cardContainer.appendChild(card);
    card.addEventListener("click", () => { //ad ogni iterazione vado ad aggiungere anche un eventlistener click 
      toggleOverlay();
      imgOverlay.src = data[i].download_url; //aggiungiamo che quando clicchiamo sull'overlay dovra sostituire src con l'immagine presa dall'index
    });
  });

  overlay.addEventListener("click", (el) => { //aggiungo la funzionalità che quando clicco sull'overlay quest'ultimo scompare
    if (el.target.tagName !== "IMG") { //il click non deve essere sulla foto
      toggleOverlay();
      console.log("chiudi con overlay");
    } else console.log("click sull'immagine");
  });

  button.addEventListener("click", (el) => { //aggiungo la funzionalità del bottone chiudi di chiudere l'immagine quando cliccato
    el.stopPropagation(); //definisco lo stop propagation dato che ho aggiunto l'event listener a tutto l'overlay, e button fa parte dell'overlay
    toggleOverlay();
    console.log("chiudi con bottone");
  });

});
