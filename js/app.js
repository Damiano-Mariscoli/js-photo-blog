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

card = document.getElementById("row-card");
console.log(card);
axios
  .get("https://jsonplaceholder.typicode.com/photos?_limit=6")
  .then((el) => {
    const data = el.data;
    console.log(el);
    console.log(data);
    data.forEach((photo) => {
      const cardElement = document.createElement("div");
      cardElement.className = "col-3";
      cardElement.innerHTML = `
            <div class="card relative">
              <div>
                <img class="absolute pin-center" src="./img/pin.svg" alt="">
              </div>
                <div class="card-wrap d-flex justify-center flex-column align-center p-4 gap-5">
                    <div>
                        <img class="image" src="${photo.url}" alt="">
                    </div>
                    <div class="caption">
                        <p>
                           ${photo.title}
                        </p>
                    </div>
                </div>
            </div>
          </div>
      `;
      card.appendChild(cardElement);
      cardElement.addEventListener("click", (e) => {
        console.log(`${photo.id}`);
        const overlayElement = document.createElement("div");
        overlayElement.className =
          "overlay d-flex justify-center align-center flex-column gap-5 relative";
        overlayElement.innerHTML = `
          <img class="img-overlay" src="${photo.url}" alt="">
          <button id="btn" class="absolute btn">chiudi</button>
            
        `;
        document.body.appendChild(overlayElement);

        

        button = document.getElementById("btn");
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          console.log("chiudi con btn");
          overlayElement.remove(overlayElement);
          
        });
        overlayElement.addEventListener("click", (e) => {
          console.log("chiudi con overlay");
          if (e.target.tagName !== 'IMG')     
          overlayElement.remove(overlayElement);
        });
      });
    });
  })

  .catch((err) => console.error(err));
