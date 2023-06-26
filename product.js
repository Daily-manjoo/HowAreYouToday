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

//아래부터 필터기능 //

// Assuming 'products' is the array of product objects loaded from the JSON file

// Filter by product name
function filterByName(name) {
  return products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
}

// Filter by price range
function filterByPrice(minPrice, maxPrice) {
  return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
}
