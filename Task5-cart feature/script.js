let list = document.getElementById("list")
let listCard = document.getElementById("listCard")
let HTML = document.querySelector("html")
let Nav = document.querySelector("nav")
let total = document.getElementById("total")
let quantity = document.getElementById("quantity")

let myCheck=document.getElementById("myCheck")


function myFunc(){
    if (myCheck.checked == true){
        HTML.setAttribute("data-bs-theme", "dark");
    Nav.classList.remove("bg-dark");
    Nav.classList.add("bg-light")
      } else {
        HTML.removeAttribute("data-bs-theme");
    Nav.classList.remove("bg-light");
    Nav.classList.add("bg-dark")
      }
}
   


let products = [
    {
        id: 1,
        name: 'Chicken Pizza',
        image: 'food1.jpg',
        price: 580,
        option: ["Regular", "Medium", "Large"]
    },
    {
        id: 2,
        name: 'Veg Loaded',
        image: 'food2.jpg',
        price: 280,
        option: ["Regular", "Medium", "Large"]
    },
    {
        id: 3,
        name: 'Capsicum with Sauce',
        image: 'food3.jpg',
        price: 350,
        option: ["Regular", "Medium", "Large"]

    },
    {
        id: 4,
        name: 'Margherita',
        image: 'food4.jpg',
        price: 299,
        option: ["Regular", "Medium", "Large"]
    },
    {
        id: 5,
        name: 'Veg Extravaganza',
        image: 'food5.jpg',
        price: 399,
        option: ["Regular", "Medium", "Large"]
    },
    {
        id: 6,
        name: 'Onion Paprika',
        image: 'food6.jpg',
        price: 199,
        option: ["Regular", "Medium","Large"]
    }
]


let listCards = []

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div')
        newDiv.classList.add('item')

        newDiv.innerHTML = `
       
       		<div class="col-12 col-sm-4 col-md-4 col-xs-12 mb-5 ">
				<div class="card rounded-2 shadow">
					<img height="150" class="rounded-2 card-img-top " src="${value.image}" alt="image">
					<div class="card-body">
						<h3 class="card-title">${value.name}</h3>
						<label class="w-100 mb-3">Size<select id="selOption" class="form-select btn-primary">
                        <option value="1">${value.option[0]}</option> 
                        <option value="2">${value.option[1]}</option>
                        <option value="3">${value.option[2]} </option>
							</select>
						</label>
                        <div style="font-weight:bold; font-size:16px" class="text-center">Price : &#8377 ${value.price.toLocaleString()}</div><br>

						<button onclick="addToCard(${key})" style="width: 100%;" class="btn btn-outline-primary">Add to Card</button>
					</div>
				</div>
			</div> `

        list.appendChild(newDiv)
    })

}

initApp()


function addToCard(key) {


    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]))
        listCards[key].quantity = 1
    }
    reloadCard()
}

function reloadCard() {
    listCard.innerHTML = ""
    let count = 0
    let totalPrice = 0
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count =count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li')
            newDiv.innerHTML = `
            <figure>
            <img src="${value.image}" alt="A beautiful image">
            <figcaption style="width:20px">${value.name}</figcaption>
         </figure>
         <figure>
         <figcaption>Price</figcaption>
         <div style="color:red">&#8377 ${value.price.toLocaleString()}</div>  
      </figure>
      <figure>
      <figcaption>Size:</figcaption>
      <div style="color:red; font-size:16px">R</div>  
   </figure>

      <figure>
      <figcaption>Quantity</figcaption>    
            <div> 
              <button class="btn btn-primary" style=" margin:1.5px"  onclick="changeQuantitiy(${key}, ${value.quantity - 1})"> - </button>
              <div class="count" > ${value.quantity}</div>
              <button class="btn btn-primary" style=" margin:1.5px" onclick="changeQuantitiy(${key}, ${value.quantity + 1})"> + </button>
            </div>  </figure>
            <button class="btn" id="delete" style="font-size:17px" onclick="Delete(${key})" ><i class="fa-solid fa-trash"></i> </button>

            `
            listCard.appendChild(newDiv)
        }
    })
    total.innerText = totalPrice.toLocaleString()
    quantity.innerText = count
}


function changeQuantitiy(key, quantity) {

    if (quantity == 0) {
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity
        
        listCards[key].price = quantity * products[key].price ;
    }
    reloadCard()

}



function Delete(key) {
    delete listCards[key]
    reloadCard()
}


