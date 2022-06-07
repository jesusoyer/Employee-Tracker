
INSERT INTO department (id,name)
VALUES
    (1,"recieving"),
    (2,"cashier"),
    (3, "sports"),
    (4,"hunting and fishing");

INSERT INTO role (role_id, title, salary, department_id)
VALUES
    (11,"truck unloader",50000,1),
    (12,"team lead", 60000,2);

INSERT INTO employee (employee_id, first_name,last_name, role_id, manager_id)
VALUES
    (21,"john","philips",11,31),
    (22,"mike", "jones", 12,32);

