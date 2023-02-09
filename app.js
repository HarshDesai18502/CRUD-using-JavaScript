const addProductBtn = document.querySelector("header button");
const addPopup = document.getElementById("add-popup");
const deletePopup = document.getElementById("delete-popup");
const backdrop = document.getElementById("backdrop");
const poster = document.getElementById("poster");
const cancelBtn = document.querySelector("#add-popup .cancel-btn");
const addBtn = document.querySelector("#add-popup .add-btn");
const userInputs = document.querySelectorAll("input");
const productList = document.getElementById("product-list");
let counter = 1;

const products = [
  {
    productId: 1,
    title: "realme 3 pro",
    imageUrl:
      "https://stickon-web-mobile-evolution.s3.ap-south-1.amazonaws.com/production/products/base_images/realme-3-pro-newPJQKNQvLYFbwBNHL.png",
    price: 500,
    description: "good phone",
  },
  {
    productId: 1,
    title: "realme 3 pro",
    imageUrl:
      "https://stickon-web-mobile-evolution.s3.ap-south-1.amazonaws.com/production/products/base_images/realme-3-pro-newPJQKNQvLYFbwBNHL.png",
    price: 600,
    description: "good phone",
  },
];

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
  }
  else  {
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

function addMovieHandler() {
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

addBtn.addEventListener("click", addMovieHandler);


// window.addEventListner("load",function(){
//     products.forEach(product => {
//         const productElement = document.createElement('li');
//     productElement.classList.add('product-element');

//     productElement.innerHTML = `<div class="product-image">
//     <img src="${product.imageUrl}" alt="${product.title}">
//   </div>
//   <div class="product-description">
//     <h2>${product.title}</h2>
//     <h5>price: ${product.price}</h5>
//     <p>Product id : ${product.price}</p>
//     <p>${product.description}</p>
//     <button class="edit">Edit</button>
//     <button class="delete">Delete</button>
//   </div>`;
//   productList.appendChild(productElement);
//     })
// });

console.log(products[0].price);

products.forEach((product) => {
  console.log(product.price);
});

window.onload = function () {
  products.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.classList.add("product-element");

    productElement.innerHTML = `<div class="product-image">
    <img src="${product.imageUrl}" alt="${product.title}">
  </div>
  <div class="product-description">
    <h2>${product.title}</h2>
    <h5>price: ${product.price}</h5>
    <p>Product id : ${product.price}</p>
    <p>${product.description}</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  </div>`;
    productList.appendChild(productElement);
  });
  updateUI();
};


// const myBtns = document.querySelectorAll('.product-element .delete');

// // deleteBtns[0].addEventListener('click',()=> {
// //     console.log('i am clicked');
// // })


// myBtns[0].addEventListener('click',()=>{
//     console.log('i am cliced');
// })

// deleteBtns.forEach(deleteBtn => {
//     deleteBtn.addEventListener('click',function() {
//         console.log('i am clicked');
//         products = [];
//     })
// })

// deleteBtn.addEventListener('click',() => {
//     console.log(this);
// } );
