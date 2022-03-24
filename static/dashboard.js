let UV_arr = [];
let SND_arr = [];
let TEMP_arr = [];

async function get_sensordata(){
    const response = await fetch("http://127.0.0.1:5000/api/dashboard",
        {
            "origins" : "*",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
    })
    const data = await response.json();
    UV_arr = [];
    SND_arr = [];
    TEMP_arr = [];
    for (let item of data){
        let sensor_data = JSON.parse(item.data);
        UV_arr.push(sensor_data.UV);
        SND_arr.push(sensor_data.Sound);
        TEMP_arr.push(sensor_data.Temperature);

    }
/*    let x = ( UV_arr.join(", "))
    console.log( [x])

    let y = ( SND_arr.join(", "))
    console.log("Sound", y)

    let z = ( TEMP_arr.join(", "))
    console.log("Temp", z)*/

console.log(UV_arr);
console.log(SND_arr);
console.log(TEMP_arr);


    }






