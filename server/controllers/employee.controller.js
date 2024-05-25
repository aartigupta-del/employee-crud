const Employee = require('../models/employee.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const employee = new Employee({
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    });

    Employee.create(employee, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;

    Employee.getAll(name, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Employee with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Employee.updateById(
        req.params.id,
        new Employee(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Employee with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Employee with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Employee with id " + req.params.id
                });
            }
        } else res.send({ message: `Employee was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all employees."
            });
        else res.send({ message: `All Employees were deleted successfully!` });
    });
};
