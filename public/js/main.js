document.getElementById('productName').addEventListener('change', function() {
    const prices = {
        'producto1': 900000.00,
        'producto2': 200000.00,
        'producto3': 500000.00
        // Añadir más productos y sus precios
    };

    const selectedProduct = document.getElementById('productName').value;
    document.getElementById('productPrice').value = prices[selectedProduct] || 0;
});

document.getElementById('splitForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        personalName: document.getElementById('personalName').value,
        personalEmail: document.getElementById('personalEmail').value,
        personalPhone: document.getElementById('personalPhone').value,
        personalAddress: document.getElementById('personalAddress').value,
        productName: document.getElementById('productName').value,
        productPrice: document.getElementById('productPrice').value,
        productQuantity: document.getElementById('productQuantity').value,
        productShippingMethod: document.getElementById('productShippingMethod').value,
        productComments: document.getElementById('productComments').value,
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert('Formulario enviado con éxito');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});