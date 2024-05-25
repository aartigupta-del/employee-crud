const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/employee.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Employee CRUD application." });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
