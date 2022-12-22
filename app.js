const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up the view engine
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static("public"));

//set up the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//array 
var users = [{
        code: 'f45632gh6',
        fullname: 'John Smith',
        age: 25,
        birthdate: '1997-01-01',
        tel: '061-123-4567'
    },
    {
        code: 'g56789hi0',
        fullname: 'Jane Doe',
        age: 32,
        birthdate: '1990-05-12',
        tel: '063-098-7654'
    },
    {
        code: 'h78901ij3',
        fullname: 'Bob Johnson',
        age: 19,
        birthdate: '2003-07-28',
        tel: '066-456-7890'
    },
    {
        code: 'i90123jk6',
        fullname: 'Alice Smith',
        age: 22,
        birthdate: '2000-03-14',
        tel: '069-789-0123'
    },
    {
        code: 'j01234kl9',
        fullname: 'Mike Williams',
        age: 29,
        birthdate: '1993-08-20',
        tel: '065-246-1357'
    },
    {
        code: 'k12345lm2',
        fullname: 'Sarah Johnson',
        age: 35,
        birthdate: '1987-02-07',
        tel: '068-369-2587'
    },
    {
        code: 'l23456mn5',
        fullname: 'Tom Smith',
        age: 40,
        birthdate: '1982-04-15',
        tel: '061-579-5324'
    },
    {
        code: 'm34567no8',
        fullname: 'Emily Williams',
        age: 45,
        birthdate: '1977-06-23',
        tel: '064-753-1598'
    },
    {
        code: 'n45678op1',
        fullname: 'James Johnson',
        age: 50,
        birthdate: '1972-09-10',
        tel: '063-147-3698'
    },
    {
        code: 'o56789pq4',
        fullname: 'Laura Smith',
        age: 55,
        birthdate: '1967-11-25',
        tel: '069-753-9514'
    }
];

app.get('/', (res, req) => {
    req.render('base', {
        users
    })
})

app.get('/create', (res, req) => {
    req.render('create');
})

app.get('/users/update/:code', (res, req) => {
    const code = res.params.code;
    const user = users.find((u) => u.code == code);
    
    req.render('update', {
        user
    });
})

app.get("/users/user/:code", (req, res) => {
    const code = req.params.code;
    const user = users.find((u) => u.code == code);
    res.render('show', {
        user: user
    });
});

app.get("/users/user-delete/:code", (req, res) => {
    const code = req.params.code;
    const userIndex = users.findIndex((u) => u.code == code);

    if (userIndex != -1)
        users.splice(userIndex, 1);

    // Redirect the user back to the root URL
    res.redirect('/');
})

app.post('/createuser', (req, res) => {

    users.push(req.body);

    let message, type;

    if (users.includes(req.body)) {
        message = "User added successfully";
        type = "success";
    } else {
        message = "Error adding user";
        type = "error";
    }

    res.render('base', {
        users,
        message: {
            type,
            text: message
        }
    });

});


app.post('/updateuser', (req, res) => {

    const {
        code,
        fullname,
        age,
        birthdate,
        tel
    } = req.body;

    const userIndex = users.findIndex((u) => u.code == code);

    let message, type; 
    
    if (userIndex != -1) {
        users[userIndex].fullname = fullname;
        users[userIndex].age = age;
        users[userIndex].birthdate = birthdate;
        users[userIndex].tel = tel;

        message = "User updated successfully";
        type = "success";
    }else{
        message = 'User Not Found';
        type = "error";
    }

    res.render('base', {
        users,
        message: {
            type,
            text: message
        }
    });

});





const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});