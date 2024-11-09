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

const imgOverlay = document.getElementById("imgOverlay");
const overlay = document.getElementById("overlay");
let cardElement;
const button = document.getElementById("button");
const cardContainer = document.getElementById("row-card");
console.log(cardContainer);

function myCreateElement4(
  tagnName,
  classList = [],
  content = [],
  callback = false
) {
  const el = document.createElement(tagnName);

  if (classList.length > 0) {
    el.classList.add(...classList);
  }

  if (callback) {
    callback(el);
  }

  if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      el.appendChild(content[i]);
    }
  } else if (content instanceof HTMLElement) {
    el.appendChild(content);
  } else if (typeof content === "string") {
    el.innerHTML = content;
  } else {
    console.error("Non posso aggiungere l'elemento");
  }

  return el;
}

function toggleOverlay() {
  overlay.classList.toggle("d-none");
  document.body.classList.toggle("overflow-hidden");
}

axios.get("https://picsum.photos/v2/list?page=12&limit=6").then((el) => {
  const data = el.data;
  console.log(el);
  console.log(data);
  console.log;

  const cardElements = data.map((photo) => {
    return myCreateElement4("div", ["col-3"], [
      myCreateElement4("div", ["card", "relative"], [
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

  cardElements.forEach((card, i) => {
    console.log(i)
    console.log(data[i].download_url);
    cardContainer.appendChild(card);
    card.addEventListener("click", () => {
      toggleOverlay();
      imgOverlay.src = data[i].download_url;
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") {
      toggleOverlay();
      console.log("chiudi con overlay");
    } else console.log("click sull'immagine");
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleOverlay();
    console.log("chiudi con bottone");
  });

});
