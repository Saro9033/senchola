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
        option: ["Regular", "Medium"]
    }
]



let listCards = []
const selectedOptions = new Array(products.length).fill(null);

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
                        <label style="font-size:15px"  class="w-100 mb-3 ">Size
                            <select style="height:30px font-size:13px" class="form-select w-100" id="product-selector-${key}"></select>
                        </label>
                        <div style="font-weight:bold; font-size:16px" class="text-center">Price : &#8377 ${value.price.toLocaleString()}</div><br>

                        <button onclick="addToCard(${key})" style="width: 100%; height:30px; font-weight:bold; font-size:1.5rem" class="btn btn-outline-primary">Add to Cart</button>
                    </div>
                </div>
            </div>`;

        list.appendChild(newDiv);

        // Create a <select> element for the current product's options
        const productSelector = document.getElementById(`product-selector-${key}`);

        value.option.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            optionElement.value = option;
            productSelector.appendChild(optionElement);
        });

  // Initialize selectedOptions array with null values
  selectedOptions[key] = null;

  // Add an event listener to each <select> element to track changes
  productSelector.addEventListener('change', (event) => {
      selectedOptions[key] = event.target.value; // Update the selected option for this product
      console.log(`Selected option for product ${key + 1}: ${selectedOptions[key]}`);
      listCards[key].option =  selectedOptions[key]
      console.log(listCards[key].option)
  });
        
    });

    console.log("fin");
}


initApp()


function addToCard(key) {  
    const selectElement = document.getElementById(`product-selector-${key}`).value;
        console.log(`Added "${selectElement}" to cart for product ${key + 1}`);
   

    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]))
        listCards[key].quantity = 1
        listCards[key].option = selectElement
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
            <div style="color:black; font-size:18px">${value.name}</div>
          <div>  <figure>
            <img src="${value.image}" alt="A beautiful image">
         </figure>
  


         <figure>
         <figcaption>Price</figcaption>
         <div style="color:red">&#8377 ${value.price.toLocaleString()}</div>  
      </figure>
      <figure>
      <figcaption>Size:</figcaption>
      <div style="color:red; font-size:12px">${value.option}</div>  
   </figure>

      <figure>
      <figcaption>Quantity</figcaption>    
            <div> 
              <button class="btn btn-primary" style=" margin:1.5px"  onclick="changeQuantitiy(${key}, ${value.quantity - 1})"> - </button>
              <div class="count" > ${value.quantity}</div>
              <button class="btn btn-primary" style=" margin:1.5px" onclick="changeQuantitiy(${key}, ${value.quantity + 1})"> + </button>
            </div>  </figure>
            <button class="btn" id="delete" style="font-size:17px" onclick="Delete(${key})" ><i class="fa-solid fa-trash"></i> </button>
</div>
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

function placeOrder(){
    console.log(quantity.innerHTML);
    if(quantity.innerHTML == 0){
        alert("Your cart is empty! Please add items")
    }
    else{
        alert("Successfully ordered!!")
        listCards = [];
        reloadCard()
    }
}

