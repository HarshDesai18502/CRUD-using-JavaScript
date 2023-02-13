const userInputs = document.querySelectorAll("input");
const updateBtn = document.querySelector(".update-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const strId = localStorage.getItem("selectedProductId");
const id = JSON.parse(strId);

const str = localStorage.getItem("ProductArray");
const parsedProducts = JSON.parse(str);

const myProduct = parsedProducts.find((product) => product.productId == id);

userInputs[0].value = myProduct.title;
userInputs[1].value = myProduct.imageUrl;
userInputs[2].value = myProduct.price;
userInputs[3].value = myProduct.description;

updateBtn.addEventListener("click", () => {
  myProduct.title = userInputs[0].value;
  myProduct.imageUrl = userInputs[1].value;
  myProduct.price = userInputs[2].value;
  myProduct.description = userInputs[3].value;

  const jsonArray = JSON.stringify(parsedProducts);
  localStorage.setItem("ProductArray", jsonArray);

  localStorage.removeItem("selectedProductId");

  alert("Product Updated Successfully");
  location.replace("./index.html");
});

cancelBtn.addEventListener("click", () => {
  localStorage.removeItem("selectedProductId");
  location.replace("./index.html");
});
