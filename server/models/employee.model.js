const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

const Employee = function(employee) {
    this.name = employee.name;
    this.salary = employee.salary;
    this.department = employee.department;
};

Employee.create = (newEmployee, result) => {
    connection.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newEmployee });
    });
};

Employee.findById = (id, result) => {
    connection.query(`SELECT * FROM employees WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Employee.getAll = (name, result) => {
    let query = "SELECT * FROM employees";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

Employee.updateById = (id, employee, result) => {
    connection.query(
        "UPDATE employees SET name = ?, salary = ?, department = ? WHERE id = ?",
        [employee.name, employee.salary, employee.department, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...employee });
        }
    );
};

Employee.remove = (id, result) => {
    connection.query("DELETE FROM employees WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

Employee.removeAll = result => {
    connection.query("DELETE FROM employees", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Employee;
