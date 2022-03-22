let input = document.getElementById('input');
let output = document.getElementById('output');
submit.addEventListener('click', function (event){
    post_request()
})

async function post_request(){
    // Get data and use POST request
    /*
    fetch function accepts 2 arguments
    1: resource: the URL string, or a Request object
    2: options: the configuration object with properties like method, headers, body, credentials
     */
    const response = await fetch("http://127.0.0.1:5000/api/grt_data",
        {
            "origins" : "*",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        body: input.value
    })
    const data = await response.json();
    console.log(data);
    output.value = data;
}

let sensor_id = document.getElementById('sensor_id');
let data = document.getElementById('data');
let timestamp = document.getElementById('timestamp');






let table = document.getElementById('table')
let get_button = document.getElementById('get_all_data');
get_button.addEventListener('click', function (event){
    retrieve_get_sensor_data()
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
        //let cell_si = document.createElement('td');
        let cell_sd = document.createElement('td');
        //let cell_tc = document.createElement('td');


        //cell_si.innerText = sensor.sensor_id;
        cell_sd.innerText = sensor.data;
        //cell_tc.innerText = sensor.timestamp;


        //row.appendChild(cell_si);
        row.appendChild(cell_sd);
        //row.appendChild(cell_tc);
        table.appendChild(row);
    }
}

setInterval(function() {
                  window.location.reload();
                }, 600000); 


