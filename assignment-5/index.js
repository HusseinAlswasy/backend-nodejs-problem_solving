const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'assignment5'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to the API App' });
})

//========================== 2 ==========================

app.post('/addColumnCategory', (req, res, next) => {
    const query ='ALTER TABLE products ADD COLUMN Category VARCHAR(255)';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Column added successfully' });
        }
    });
})

//========================== 3 ==========================
app.post('/removeColumnCategory', (req, res, next) => {
    const query ='ALTER TABLE products Drop COLUMN Category';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Column Deleted successfully' });
        }
    });
})
//========================== 4 ==========================
app.post('/changeContactNumber', (req, res, next) => {
    const query ='ALTER TABLE suppliers Modify COLUMN S_contactNumber VARCHAR(15)';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Column Edit successfully' });
        }
    });
})

//========================== 5 ==========================
app.post('/addNotNullConstrain', (req, res, next) => {
    const query = 'ALTER TABLE products Modify COLUMN P_Name VARCHAR(200) NOT NULL';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Column Edit successfully' });
        }
    });
})

//========================== 6.a ==========================
app.post('/insertIntoSupplier', (req, res, next) => {
    const query = 'INSERT INTO suppliers VALUES (1,"FreshFoods","01064047084");';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Inserted successfully' });
        }
    });
})

//========================== 6.b ==========================
app.post('/insertIntoProducts', (req, res, next) => {
    const query = `INSERT INTO products (P_Name, P_Price, P_StockQuantity, P_SupplierID)
    VALUES 
    ('Milk', 15.00, 50, 1),
    ('Bread', 10.00, 30, 1),
    ('Eggs', 20.00, 40, 1)`;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Inserted successfully' });
        }
    });
})
//========================== 6.b ==========================
app.post('/insertIntoSales', (req, res, next) => {
    const query = `INSERT INTO sales (S_ProductID, S_QuantitySold, S_SaleDate)
VALUES (1, 2, '2025-05-20');`;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Inserted successfully' });
        }
    });
})

//========================== 7 ==========================
app.post('/Updatetheprice', (req, res, next) => {
    const query = 'UPDATE products SET P_Price = 25.00 WHERE P_Name = "Bread";';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'UPDATE successfully' });
        }
    });
})

//========================== 8 ==========================
app.post('/Deletetheproduct', (req, res, next) => {
    const query = 'Delete FROM products Where P_Name = "Eggs";';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'Delete successfully' });
        }
    });
})

//========================== 9 ==========================
app.get('/quantitysoldForEachProduct', (req, res, next) => {
    const query = `SELECT products.P_Name, SUM(S_QuantitySold) 
    AS TotalQuantitySold 
    FROM products JOIN sales ON products.P_ID = sales.S_ProductID GROUP BY P_Name;`;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'get qs successfully', data: result });
        }
    });
})

//========================== 10 ==========================
app.get('/HighestStock', (req, res, next) => {
    const query = 'Select * from products order by P_StockQuantity DESC limit 1;';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'get successfully', data: result });
        }
    });
})

//========================== 11 ==========================
app.get('/getSupp', (req, res, next) => {
    const query = 'Select * from suppliers where S_SupplierName Like "F%";';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'get successfully', data: result });
        }
    });
})

//========================== 12 ==========================
app.get('/getAllProductsThatHaveNverBeenSold', (req, res, next) => {
    const query = 'Select * from products Left join sales on products.P_ID = sales.S_productID Where sales.S_ProductID is not null;';
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'get successfully', data: result });
        }
    });
})

//========================== 13 ==========================
app.get('/getAllProductsThatHaveNameDate', (req, res, next) => {
    const query = `SELECT products.P_Name, sales.S_SaleDate
FROM sales
INNER JOIN products ON products.P_ID = sales.S_ProductID;`;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error executing query' });
        }else{
            return res.status(200).json({ message: 'get successfully', data: result });
        }
    });
})

//========================== 14 ==========================
app.post('/createStoreManagerUser', (req, res) => {
    const createUserQuery = `CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY '1234';`;
    const grantQuery = `GRANT SELECT, INSERT, UPDATE ON assignment5.* TO 'store_manager'@'localhost';`;

    connection.execute(createUserQuery, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error creating user', error: err.message });
            
        }

        connection.execute(grantQuery, (err, result) => {
            if (err) {
                return res.status(400).json({ message: 'Error granting permissions' });
            } else {
                return res.status(200).json({ message: 'User created and permissions granted successfully' });
            }
        });
    });
});

//========================== 15 ==========================
app.post('/revokeUpdateFromStoreManager', (req, res) => {
    const query = `REVOKE UPDATE ON assignment5.* FROM 'store_manager'@'localhost';`;

    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error revoking permission' });
        } else {
            return res.status(200).json({ message: 'UPDATE permission revoked successfully' });
        }
    });
});

//========================== 16 ==========================
app.post('/grantDeleteOnSalesToStoreManager', (req, res) => {
    const query = `GRANT DELETE ON assignment5.sales TO 'store_manager'@'localhost';`;

    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error granting delete permission' });
        } else {
            return res.status(200).json({ message: 'DELETE permission granted on sales successfully' });
        }
    });
});


app.use("{/*demo}", (req, res, next) => {
    return res.status(404).json({ message: `URL${req.originalUrl} method ${req.method} not found` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})