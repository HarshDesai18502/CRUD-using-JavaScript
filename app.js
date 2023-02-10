const addProductBtn = document.querySelector("header button");
const addPopup = document.getElementById("add-popup");
const deletePopup = document.getElementById("delete-popup");
const backdrop = document.getElementById("backdrop");
const poster = document.getElementById("poster");
const cancelBtn = document.querySelector("#add-popup .cancel-btn");
const addBtn = document.querySelector("#add-popup .add-btn");
const userInputs = document.querySelectorAll("input");
const productList = document.getElementById("product-list");

const searchText = document.getElementById('search-text');
const searchBtn = document.querySelector('.search-btn');
const clearBtn = document.querySelector('.clear-btn');
const divTable = document.querySelector('.table-div');

const filterBtn = document.querySelector('.filter-btn');

let products = [];



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

  var uniq = Date.now().toString(36) + Math.random().toString(36).substr(2);
  console.log(uniq);

  const productElement = {
    productId: uniq,
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
    <button class="view" id='${id}' onclick = "viewProduct(${id})">View</button>
    <button class="edit" id='${id}' onclick = "editProduct(${id})">Edit</button>
    <button class="delete" id='${id}' onclick = "deleteProduct(${id})">Delete</button>
  </div>`;
  productList.appendChild(productElement);
  updateUI();
}

//To view a product 
function viewProduct(id) {

  const jsonId = JSON.stringify(id);
  localStorage.setItem("selectedProductId", jsonId);

  location.replace('./view.html');
}

//To Update a product
function editProduct(id) {

  const jsonId = JSON.stringify(id);
  localStorage.setItem("selectedProductId", jsonId);

  location.replace('./update.html');
}

//To delete a product
function deleteProduct(id){
  const post = products.find(product => product.productId == id);
  let index = products.indexOf(post);
  console.log(index);
  products.splice(index,1);

  const jsonArray = JSON.stringify(products);
  localStorage.setItem("ProductArray", jsonArray);
  productList.children[index].remove();
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
    <button class="view" id='${product.productId}' onclick = "viewProduct(${product.productId})">View</button>
    <button class="edit" id='${product.productId}' onclick = "editProduct(${product.productId})">Edit</button>
    <button class="delete" id='${product.productId}' onclick = "deleteProduct(${product.productId})">Delete</button>
  </div>`;
    productList.appendChild(productElement);
  });
  counter = products.length + 1
  updateUI();
}

//Search function 
searchBtn.addEventListener('click', () => {
  const Result = [];
  products.forEach(product => {
    if(product.title == searchText.value) {
      Result.push(product);
    }
  });

  const element = document.querySelector('.searched-product');
  if(element !== null) {
    element.remove();
  }

  const div = document.createElement('div');
  div.classList.add('searched-product');
  const heading = document.createElement('h1');
  heading.innerHTML = 'Result of the Search';
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  
  console.log(Result);

  for(let i=0; i < Result.length; i++) {
    const row = document.createElement("tr");
    for(let x in Result[i]) {
      const temp = Result[i];
      const cell = document.createElement("td");
      const cellText = document.createTextNode(`${temp[x]}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  
  tbl.appendChild(tblBody);
  div.appendChild(tbl);

  divTable.appendChild(div);
  
});

clearBtn.addEventListener('click',() => {
  const element = document.querySelector('.searched-product');
  if(element !== null) {
    element.remove();
  }
  searchText.value = '';
});

filterBtn.addEventListener('click',()=>{
  products.sort(function(a,b) {
    return (a.price - b.price);
  });

  productList.innerHTML = '';

  products.forEach(product => {
    renderProduct(product.productId,product.title,product.imageUrl,product.price,product.description);
  })

});


// function isValidURL(string) 
// {
//     var res = 
//     string.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-
//     ]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]
//     \.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|w
//     ww\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);

//   return (res !== null);
// };