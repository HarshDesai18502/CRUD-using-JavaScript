// const productDiv =  document.querySelectorAll('.product');


const strId = localStorage.getItem("selectedProductId");
const id = JSON.parse(strId);

const str = localStorage.getItem("ProductArray");
const parsedProducts = JSON.parse(str);

const myProduct = parsedProducts.find((product) => product.productId == id);


document.body.innerHTML = `<div class="product"><div class="header">
<h1>Your Product</h1>
</div>
<div class="description">
<div class="image">
  <img src="=${myProduct.imageUrl}" alt="${myProduct.title}" />
</div>
<div class="text">
  <h1>${myProduct.title}</h1>
  <h5>price: ${myProduct.price}</h5>
  <p>Product id : ${myProduct.productId}</p>
  <p>${myProduct.description}</p>
  
    <button class="edit btn">Edit</button>
    <button class="delete btn">Delete</button>
    <button class="close btn">Close</button>
</div>
</div></div>
`;

const editBtn = document.querySelector(".edit");
const deleteBtn = document.querySelector(".delete");
const closeBtn = document.querySelector(".close");

editBtn.addEventListener('click',()=>{

  location.replace('./update.html');
});

deleteBtn.addEventListener('click',()=>{
    
  let index = parsedProducts.indexOf(myProduct);
  console.log(index);
  parsedProducts.splice(index,1);

  const jsonArray = JSON.stringify(parsedProducts);
  localStorage.setItem("ProductArray", jsonArray);
  localStorage.removeItem('selectedProductId');
  alert('Product deleted');
  location.replace('./index.html');
});

closeBtn.addEventListener('click',()=>{
    localStorage.removeItem('selectedProductId');
    location.replace('./index.html');
});