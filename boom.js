const addProductBtn = document.querySelector("header button");
const addPopup = document.getElementById("add-popup");
const deletePopup = document.getElementById("delete-popup");
const backdrop = document.getElementById("backdrop");
const poster = document.getElementById("poster");
const cancelBtn = document.querySelector("#add-popup .cancel-btn");
const addBtn = document.querySelector("#add-popup .add-btn");
const userInputs = document.querySelectorAll("input");
const productList = document.getElementById("product-list");

let products = [];

let counter = products.length + 1;

function clearInputs() {
  userInputs[0].value = "";
  userInputs[1].value = "";
  userInputs[2].value = "";
  userInputs[3].value = "";
}

function toggleAddPopUp() {
  addPopup.classList.toggle("visible");
}

function toggleBackDrop() {
  backdrop.classList.toggle("visible");
}

function updateUI() {
  if (products.length !== 0) {
    poster.style.display = "none";
  } else {
    poster.style.display = "flex";
  }
}

addProductBtn.addEventListener("click", () => {
  toggleAddPopUp();
  toggleBackDrop();
  updateUI();
});

cancelBtn.addEventListener("click", () => {
  toggleAddPopUp();
  toggleBackDrop();
  poster.style.display = "flex";
  clearInputs();
  updateUI();
});

backdrop.addEventListener("click", () => {
  toggleAddPopUp();
  toggleBackDrop();
  poster.style.display = "flex";
  clearInputs();
});

function addProductHandler() {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const price = userInputs[2].value;
  const description = userInputs[3].value;

  if (title.trim() === "") {
    alert("Enter Title");
    return;
  }
  if (imageUrl.trim() === "") {
    alert("Enter ImageUrl");
    return;
  }
  if (isNaN(price)) {
    alert("Enter valid price");
    return;
  }
  if (description.trim() === "") {
    alert("Enter description");
    return;
  }

  const productElement = {
    productId: counter,
    title,
    imageUrl,
    price,
    description,
  };
  console.log(productElement);
  products.push(productElement);
  // convert array to JSON string using JSON.stringify()
  const jsonArray = JSON.stringify(products);

  // save to localStorage using "array" as the key and jsonArray as the value
  localStorage.setItem("ProductArray", jsonArray);
  console.log(products);
  clearInputs();
  toggleAddPopUp();
  toggleBackDrop();

  counter++;

  renderProduct(
    productElement.productId,
    productElement.title,
    productElement.imageUrl,
    productElement.price,
    productElement.description
  );
}

function renderProduct(id, title, imageUrl, price, description) {
  const productElement = document.createElement("li");
  productElement.classList.add("product-element");

  productElement.innerHTML = `<div class="product-image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="product-description">
    <h2>${title}</h2>
    <h5>price: ${price}</h5>
    <p>Product id : ${id}</p>
    <p>${description}</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  </div>`;
  productList.appendChild(productElement);
  updateUI();
}

addBtn.addEventListener("click", addProductHandler);

window.onload = LoadProducts;

function LoadProducts() {
  const str = localStorage.getItem("ProductArray");

  const parsedProducts = JSON.parse(str);
  if(parsedProducts === null) return;
  
  products = parsedProducts;

  

  parsedProducts.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.classList.add("product-element");

    productElement.innerHTML = `<div class="product-image">
    <img src="${product.imageUrl}" alt="${product.title}">
  </div>
  <div class="product-description">
    <h2>${product.title}</h2>
    <h5>price: ${product.price}</h5>
    <p>Product id : ${product.productId}</p>
    <p>${product.description}</p>
    <button class="edit">Edit</button>
    <button class="delete" id='${product.productId}'>Delete</button>
  </div>`;
    productList.appendChild(productElement);
  });
  updateUI();
}

//Okkk upto here

//function to wait for the elment
waitForElementToDisplay(".delete", getDeleteBtns, 1000, 9000);

function waitForElementToDisplay(
  selector,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    } else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}

//get delete buttons
function getDeleteBtns() {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      const id = this.id;
      

        
        //location.reload();

        // let movieIndex = 0;
        // for(const product of products) {
        //     if(product.productId === id) {
        //         break;
        //     }
        //     movieIndex++;
        // }
        // products.splice(movieIndex,1);
        // console.log(movieIndex);
        // console.log(products);

        const index = products.findIndex(product => product.productId ===   this.id);
        products.splice(index, 1);
        console.log(index);

        const jsonArray = JSON.stringify(products);
        localStorage.setItem("ProductArray", jsonArray);

        LoadProducts();
    });
  });
}

