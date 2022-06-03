const client = require("./connection.js");
const express = require("express");
const app = express();
app.all("/*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://timworx.com:20011");

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Content-Type"
  );

  next();
});
app.listen(21011, () => {
  console.log(`server is running on 21011`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

client.connect();

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/employees", (req, res) => {
  client.query(
    `select id,
    firstname,
    lastname,
    position,
    annual,
    phonenumber,
    email
from employees;
    `,
    (err, result) => {
      if (!err) {
        console.log("getEmployees :", result.rows);
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.get("/employees/:id", (req, res) => {
  client.query(
    `select id,firstname,lastname,position,annual,phonenumber,email from employees WHERE id=${req.params.id};`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.post("/employees", (req, res) => {
  let insertQuery = `INSERT INTO public.employees (firstname,lastname,position,annual,phonenumber,email)VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.position}',${req.body.annual},'${req.body.phonenumber}','${req.body.email}')`;
  console.log(req.body);
  client.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.delete("/employees/:id", (req, res) => {
  let insertQuery = `DELETE FROM employees WHERE id=${req.params.id};`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.delete("/annuals/:id", (req, res) => {
  let insertQuery = `DELETE FROM annuals WHERE id=${req.params.id}`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.put("/employees/:id", (req, res) => {
  const change = req.body;
  console.log(change);
  let updateQuery = `UPDATE employees
    set firstname = '${change.firstname}',
    lastname = '${change.lastname}',
    position = '${change.position}',
    annual = ${change.annual},
    phonenumber = '${change.phonenumber}',
    email = '${change.email}'
    WHERE id = ${req.params.id}`;
  client.query(updateQuery, (err, result) => {
    if (!err) {
      console.log("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
app.put("/annuals", (req, res) => {
  const change = req.body;
  console.log(change);
  let updateQuery = `UPDATE annuals
    set fromday = '${change.fromday}',
    today = '${change.today}',
    term = '${change.term}'
    WHERE id = ${change.id}`;
  client.query(updateQuery, (err, result) => {
    if (!err) {
      console.log("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.post("/annuals", (req, res) => {
  let insertQuery = `INSERT INTO public.annuals (fromday, today, term, employees_id)VALUES('${req.body.fromday}','${req.body.today}',${req.body.term},'${req.body.employees_id}')`;
  console.log(req.body);
  client.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
app.get("/annuals/:id", (req, res) => {
  client.query(
    `select a.id,
    a.fromday,
    a.today,
    a.term,
    a.employees_id,
    b.firstname,
    b.lastname    from annuals as a
    left join employees as b
    on a.employees_id = b.id
    where a.employees_id =
     ${req.params.id} ;`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(result.rows);
      }
    }
  );
  client.end;
});
app.get("/leftover/:id", (req, res) => {
  client.query(
    `select a.id,
      (a.annual-sum(b.term))as leftover
      from employees as a
      inner join annuals as b
      on a.id = b.employees_id
      GROUP BY a.id,b.employees_id
      having employees_id = ${req.params.id} ;`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(result.rows);
      }
    }
  );
  client.end;
});
