function showProducts(category) {
    const productCardContainer = document.getElementById('product-cards');
    productCardContainer.innerHTML = '';

    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const products = data.categories.find(cat => cat.category_name.toLowerCase() === category);
            if (products) {
                products.category_products.forEach(product => {
                    const discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                    productCardContainer.innerHTML += `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.title}">
                            <div class="badge">${product.badge_text ?product.badge_text:' '}</div>
                            <h3>${product.title}</h3>
                            <p>Vendor: ${product.vendor}</p>
                            <p class="line">Price: ₹${product.price}</p>
                            <p>Compare at Price: ₹${product.compare_at_price}</p>
                            <p class="disc">Discount: ${discountPercentage}% off</p>
                        </div>
                    `;
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initial display of Men products
showProducts('men');