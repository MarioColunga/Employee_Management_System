const connect = require("../src/connection");

class Query {
    constructor (connect) {
        this.connect = connect;
    };
    
    AllDepartments() {
        return this.connect.promise().query("SELECT * FROM department");
    };

    AllRoles() {
        return this.connect.promise().query("SELECT role.id, role.title, department.name AS 'department', role.salary FROM role, department WHERE role.department_id=department.id ORDER BY role.id");
    };

    AllEmployees() {
        return this.connect.promise().query("SELECT e.id, e.first_name, e.last_name, role.title, department.name AS 'department', role.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'N/A') AS 'manager' FROM employee e LEFT JOIN role ON e.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee m ON e.manager_id=m.id");
    };

    newDepartment(department) {
        return this.connect.promise().query(`INSERT INTO department (name) VALUES (?)`, [department]);
    };

    newRole(title, salary, department) {
        return this.connect.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department]);
    };

    selectDepartment() {
        return this.connect.promise().query("SELECT name, id AS value FROM department");
    }

    newEmployee(first_name, last_name, role_id, manager_id) {
        return this.connect.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id]);
    };

    selectTitle() {
        return this.connect.promise().query("SELECT title AS name, id AS value FROM role");
    };

    selectManager() {
        return this.connect.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee");
    };

    updateEmployeeRole(role_id, employee_id) {
        return this.connect.promise().query(`UPDATE employee SET role_id = (?) WHERE id = (?)`, [role_id, employee_id]);
    };

    selectEmployee() {
        return this.connect.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee");
    };
};

module.exports = new Query(connect);