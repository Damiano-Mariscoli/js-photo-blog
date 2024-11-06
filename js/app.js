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
const cardHtml = `<div class="col-3">
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
          </div>`


axios.get('https://jsonplaceholder.typicode.com/photos?_limit=6')
  .then(el => {
    const data = el.data;
    data.forEach(photo => {
     
    })
  })
  .catch(err => console.error(err));
    
