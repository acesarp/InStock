
let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let warehouseRouter = require('./routes/warehouseRouter');
let inventoryRouter = require('./routes/inventoryRouter');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/warehouses', warehouseRouter);
app.use('/inventory', inventoryRouter);

const port = process.env.PORT || '5001';

app.set('port', port);
app.listen(port, () => {
    console.log(`==> App listening at http://localhost:${app.get('port')}`);
});

module.exports = app;