let input = document.getElementById('input');
let output = document.getElementById('output');
let submit = document.getElementById('submit');
submit.addEventListener('click', function (event){
    post_request()
})

let name = document.getElementById('name');
let password = document.getElementById('sup_password');
let email = document.getElementById('sup_email');
let add_button = document.getElementById('sup_user');

add_button.addEventListener('click', function (event){
    add_new_user()
})

async function add_new_user(){
    const response = await fetch("http://127.0.0.1:5000/api/add_new_user",
        {
            "origins" : "*",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        body: `{ "name": "${name.value}", "password": "${(password.value)}", "sup_email": "${sup_email.value}"}`
    })
    const data = await response.json();
    console.log(data);
    alert(data);
}

let table = document.getElementById('table')
let get_button = document.getElementById('get_all_users');
get_button.addEventListener('click', function (event){
    retrieve_users()
})


async function retrieve_users(){
    const response = await fetch("http://127.0.0.1:5000/api/get_users",
        {
            "origins" : "*",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
    })
    const data = await response.json();

    console.log(data);

    for (let idx in data){
        let user = data[idx];
        // console.log(user)
        // users.push(JSON.stringify(user));
        let row = document.createElement('tr');
        let cell_un = document.createElement('td');
        let cell_pw = document.createElement('td');
        let cell_em = document.createElement('td');

        cell_ln.innerText = user.lastname;
        cell_pw.innerText = user.password;
        cell_em.innerText = user.email;

        row.appendChild(cell_un);
        row.appendChild(cell_pw);
        row.appendChild(cell_em);
        table.appendChild(row);
    }
}


let signin_password = document.getElementById('sin_password');
let signin_email = document.getElementById('sin_email');
let signin_button = document.getElementById('sin_user');
signin_button.addEventListener('click', function (event){
    sign_in_user()
})

async function sign_in_user(){
    const response = await fetch("http://127.0.0.1:5000/api/sign_in_user",
        {
            "origins" : "*",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        body: `{"password": "${(sin_password.value)}", "email": "${sin_email.value}"}`
    })
    const data = await response.json();
    console.log(data);
    alert(data);
}