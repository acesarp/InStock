
let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
const upload = require('multer')();
let videoRouter = require('./router');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array('file', 2));
app.use(cookieParser());
app.use('/videos', videoRouter);

app.use(function (error, req, res, next) {
    console.log(error, req);
    next();
});
const port = process.env.PORT || '5001';

app.set('port', port);
app.listen(port, () => {
    console.log(`==> App listening at http://localhost:${app.get('port')}`);
});

module.exports = app;