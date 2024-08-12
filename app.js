const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const personalDbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'personaldb',
    password: 'postgres',
    port: 5434,
};

const productDbConfig = {
    user: 'juanjo',
    host: '25.37.151.193',
    database: 'productodb',
    password: '#Mahecha3.',
    port: 5432,
};

app.post('/submit', async (req, res) => {
    const { personalName, personalEmail, personalPhone, personalAddress, productName, productPrice, productQuantity, productShippingMethod, productComments } = req.body;

    const personalClient = new Client(personalDbConfig);
    const productClient = new Client(productDbConfig);

    try {
        await personalClient.connect();
        await productClient.connect();

        // Inserta la información personal y captura el ID
        const personalResult = await personalClient.query(
            'INSERT INTO personal_table (name, email, phone, address, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id',
            [personalName, personalEmail, personalPhone, personalAddress]
        );
        const personalId = personalResult.rows[0].id;

        // Inserta la información del producto y usa el ID de la persona
        await productClient.query(
            'INSERT INTO product_table (product, price, quantity, shipping_method, comments, personal_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)',
            [productName, productPrice, productQuantity, productShippingMethod, productComments, personalId]
        );

        res.json({ message: 'Formulario enviado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al enviar el formulario' });
    } finally {
        await personalClient.end();
        await productClient.end();
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});