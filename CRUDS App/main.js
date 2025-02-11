let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById("discount");
let title = document.getElementById('title');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let crteatedAt = document.getElementById('create');
let mood = 'create';
let tmp;

// Function to get the total price
function getTotalPrice() {
    if (price.value != "") {
      let result =  +price.value + +ads.value + +taxes.value - +discount.value;
      total.innerHTML = result;
    }else {
        total.innerHTML = "";
    }
}
price.addEventListener('input', getTotalPrice);
ads.addEventListener('input', getTotalPrice);
taxes.addEventListener('input', getTotalPrice);
discount.addEventListener('input', getTotalPrice);

// create a new product
let productsInfo;
if (localStorage.products != null) {
    productsInfo = JSON.parse(localStorage.getItem('products'));
} else {
    productsInfo = [];
}
crteatedAt.addEventListener('click', function () {
    if (!validateCount(count.value)) {
      return;
    }
    if (!validation()) {
        return;
    }
    let product = {
        title: title.value,
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (mood == 'create') {
        product.totalQuantity = parseInt(count.value);
        productsInfo.push(product);
    } else {
        productsInfo[tmp] = product;
        mood = 'create';
        crteatedAt.innerHTML = 'Create';
        product.totalQuantity = parseInt(count.value);
        
    }
    localStorage.setItem('products', JSON.stringify(productsInfo));
    title.value = "";
    price.value = "";
    ads.value = "";
    taxes.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    readProducts();
});

// Function to read the products
function readProducts() {
    let tableContent = '';
    for (let i = 0; i < productsInfo.length; i++) {
        tableContent += `<tr>
                    <td>${i+1}</td>
                    <td>${productsInfo[i].title}</td>
                    <td>${productsInfo[i].price}</td>
                    <td>${productsInfo[i].taxes}</td>
                    <td>${productsInfo[i].ads}</td>
                    <td>${productsInfo[i].discount}</td>
                    <td>${productsInfo[i].total}</td>
                    <td>${productsInfo[i].totalQuantity}</td>
                    <td>${productsInfo[i].category}</td>
                    <td><button onclick="editProduct(${i})">Update</button></td>
                    <td><button onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
    }
    document.getElementById('table').innerHTML = tableContent;
    let btnDeleteAll = document.getElementById("deleteAll");
    if (productsInfo.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteALLProducts()">Delete All (${productsInfo.length})</button>`;
    } else {
        btnDeleteAll.innerHTML = '';
    }
}
readProducts();

// Delete product
function deleteProduct(i) {
    productsInfo.splice(i, 1);
    localStorage.products = JSON.stringify(productsInfo);
    readProducts();
}
// Delete All Products
function deleteALLProducts() {
    localStorage.clear();
    productsInfo.splice(0);
    readProducts();
}

// Update a product
function editProduct(i) {
    title.value = productsInfo[i].title;
    price.value = productsInfo[i].price;
    taxes.value = productsInfo[i].taxes;
    ads.value = productsInfo[i].ads;
    discount.value = productsInfo[i].discount;
    count.value = productsInfo[i].count
    getTotalPrice();
    category.value = productsInfo[i].category;
    crteatedAt.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

//Search
let searchInput = document.getElementById("search");
let searchMood = "title";
function searchmood(id) {
    if (id == 'searchBtnTitle') {
        searchMood = 'title';
        searchInput.placeholder = "Search By Title";
    } else if (id == 'searchCategory') {
        searchMood = 'category';
        searchInput.placeholder = "Search By Category";
    } else {
        searchMood = 'price';
        searchInput.placeholder = "Search By Price";
    }
    searchInput.focus();
    searchInput.value = '';
    readProducts();
}
function searchProducts(value) {
    if (!value.trim()) {
      readProducts();
      return;
    }
  let tableContent = "";
  if (searchMood == "title") {
    for (let i = 0; i < productsInfo.length; i++) {
      if (productsInfo[i].title.toLowerCase().includes(value.toLowerCase())) {
        tableContent += `<tr>
                    <td>${i}</td>
                    <td>${productsInfo[i].title}</td>
                    <td>${productsInfo[i].price}</td>
                    <td>${productsInfo[i].taxes}</td>
                    <td>${productsInfo[i].ads}</td>
                    <td>${productsInfo[i].discount}</td>
                    <td>${productsInfo[i].total}</td>
                    <td>${productsInfo[i].count}</td>
                    <td>${productsInfo[i].category}</td>
                    <td><button onclick="editProduct(${i})">Update</button></td>
                    <td><button onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
      }
      document.getElementById("table").innerHTML = tableContent;
    }
  } else if (searchMood == "category") {
    for (let i = 0; i < productsInfo.length; i++) {
      if (
        productsInfo[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
        tableContent += `<tr>
                    <td>${i}</td>
                    <td>${productsInfo[i].title}</td>
                    <td>${productsInfo[i].price}</td>
                    <td>${productsInfo[i].taxes}</td>
                    <td>${productsInfo[i].ads}</td>
                    <td>${productsInfo[i].discount}</td>
                    <td>${productsInfo[i].total}</td>
                    <td>${productsInfo[i].count}</td>
                    <td>${productsInfo[i].category}</td>
                    <td><button onclick="editProduct(${i})">Update</button></td>
                    <td><button onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
      }
      document.getElementById("table").innerHTML = tableContent;
    }
  } else {
    for (let i = 0; i < productsInfo.length; i++) {
      if (productsInfo[i].price.includes(value)) {
        tableContent += `<tr>
                    <td>${i}</td>
                    <td>${productsInfo[i].title}</td>
                    <td>${productsInfo[i].price}</td>
                    <td>${productsInfo[i].taxes}</td>
                    <td>${productsInfo[i].ads}</td>
                    <td>${productsInfo[i].discount}</td>
                    <td>${productsInfo[i].total}</td>
                    <td>${productsInfo[i].count}</td>
                    <td>${productsInfo[i].category}</td>
                    <td><button onclick="editProduct(${i})">Update</button></td>
                    <td><button onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
      }
      document.getElementById("table").innerHTML = tableContent;
    }
  }
}

//validation
function validateCount(count) {
  const value = parseInt(count);
  if (isNaN(value) || value <= 0) {
    alert("Enter a Number is Bigger Than 0");
    return false;
  }
  if (value > 100) {
    alert("Max Count Is 100");
    return false;
  }
  return true;
}
function validation() {
    if (title.value == '') {
        return false; 
    }
    if (
      price.value <= 0 ||
      ads.value < 0 ||
      taxes.value < 0 ||
      discount.value < 0
    ) {
        return false;
    }
    if (price.value <= discount.value) {
        return false;
    }
    return true;    
}






    
