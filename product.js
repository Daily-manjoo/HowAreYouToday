fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    const productListContainer = document.getElementById("product-list");

    // Ensure the product list container is found
    if (!productListContainer) {
      console.log("Error: Product list container not found.");
      return;
    }

    // Loop through each product in the data array
    data.forEach((product, index) => {
      // Create the HTML elements to display product information
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      const productLink = document.createElement("a");
      productLink.href = "#"; // Replace "#" with the actual link URL

      const productImage = document.createElement("img");
      const imageIndex = (index % 8) + 1; // Calculate the image index from 1 to 8
      productImage.src = `./images/newlist${imageIndex}.jpg`;
      productImage.alt = product.title; // Set the alt text for accessibility

      const productName = document.createElement("h4");
      productName.textContent = product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title;
      productName.title = product.title; // Add a tooltip with the full product title

      const productPrice = document.createElement("p");
      productPrice.textContent = `$${product.price}`;

      // Append the product image to the product link
      productLink.appendChild(productImage);

      // Append the product link, name, and price to the product item
      productItem.appendChild(productLink);
      productItem.appendChild(productName);
      productItem.appendChild(productPrice);

      // Append the product item to the product list container
      productListContainer.appendChild(productItem);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

//아래부터 페이지네이션
// JavaScript code for pagination
// You can customize this code as per your requirements

const productListContainer = document.getElementById("product-list");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
const pageNumbersContainer = document.querySelector(".page-numbers");
const pageSize = 8; // Number of products per page
let currentPage = 1;

// Function to display products for the current page
function displayProducts(pageNumber) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const products = getData(); // Replace this with your actual function to fetch products

  // Clear the product list container
  productListContainer.innerHTML = "";

  // Loop through the products for the current page and display them
  for (let i = startIndex; i < endIndex; i++) {
    if (i < products.length) {
      const product = products[i];
      // Create the HTML elements to display product information
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      const productName = document.createElement("h4");
      productName.textContent = product.title;

      const productPrice = document.createElement("p");
      productPrice.textContent = `$${product.price}`;

      // Append the product name and price to the product item
      productItem.appendChild(productName);
      productItem.appendChild(productPrice);

      // Append the product item to the product list container
      productListContainer.appendChild(productItem);
    }
  }

  // Update the page numbers
  updatePageNumbers();
}

// Function to fetch products (replace this with your actual API call or data retrieval logic)
// Function to fetch products (replace this with your actual API call or data retrieval logic)
function getData() {
  // Return a sample array of products for demonstration
  return [
    { title: "Product 1", price: 10 },
    { title: "Product 2", price: 20 },
    { title: "Product 3", price: 30 },
    { title: "Product 4", price: 40 },
    { title: "Product 5", price: 50 },
    { title: "Product 6", price: 60 },
    { title: "Product 7", price: 70 },
    { title: "Product 8", price: 80 },
    { title: "Product 9", price: 90 },
    { title: "Product 10", price: 100 },
    { title: "Product 11", price: 110 },
    { title: "Product 12", price: 120 },
    { title: "Product 13", price: 130 },
    { title: "Product 14", price: 140 },
    { title: "Product 15", price: 150 },
    { title: "Product 16", price: 160 },
    { title: "Product 17", price: 170 },
    { title: "Product 18", price: 180 },
    { title: "Product 19", price: 190 },
    { title: "Product 20", price: 200 },
  ];
}

// Function to display products for the current page
// Function to update the page numbers
function updatePageNumbers() {
  const products = getData();
  const totalPages = Math.ceil(products.length / pageSize);
  const pageNumbersContainer = document.querySelector(".page-numbers");

  // Clear the page numbers container
  pageNumbersContainer.innerHTML = "";

  // Create and append page number elements
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("li");
    pageNumber.innerHTML = `<span>${i}</span>`;
    pageNumber.classList.add("numb");
    if (i === currentPage) {
      pageNumber.classList.add("active");
    }

    pageNumber.addEventListener("click", () => {
      currentPage = i;
      displayProducts(currentPage);
      updatePageNumbers();
    });

    pageNumbersContainer.appendChild(pageNumber);
  }
}

// Update the page numbers
updatePageNumbers();
