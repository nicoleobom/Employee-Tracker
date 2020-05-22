INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("HR & Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 90000, 1), ("Software Engineer", 150000, 2), ("Sales Executive", 135000, 2), ("Finance Manager", 75000, 3), ("Lawyer", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nicole", "OBomsawin", 1, 1), ("Colin", "Pyzza", 2, 1), ("Stephanie", "Arpin", 3, 2), ("Tyler", "Arpin", 4, 2), ("Freya", "Pyzza", 2, 1);
