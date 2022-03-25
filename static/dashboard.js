
let UV_arr = [];
let SND_arr = [];
let TEMP_arr = [];

async function get_sensordata1(){
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
    //SND_arr = [];
    //TEMP_arr = [];
    for (let item of data){
        let sensor_data = JSON.parse(item.data);
        UV_arr.push(sensor_data.UV);
        //SND_arr.push(sensor_data.Sound);
        //TEMP_arr.push(sensor_data.Temperature);


    }
    /*let x = ( UV_arr.join(", "))
    console.log([x])

    let y = ( SND_arr.join(", "))
    console.log([y])

    let z = ( TEMP_arr.join(", "))
    console.log([z])*/

    /*console.log(UV_arr);
    console.log(SND_arr);
    console.log(TEMP_arr);*/
    var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    var yValues = UV_arr.slice((UV_arr.length - 11), UV_arr.length);
const ctx = document.getElementById('myChart1').getContext('2d');
const myChart =new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,255,255,10)",
          data: yValues

        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 0, max:1}}],
        }
      }
    });


    }


async function get_sensordata2(){
    const response = await fetch("http://127.0.0.1:5000/api/dashboard",
        {
            "origins" : "*",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
    })
    const data = await response.json();
    //UV_arr = [];
    SND_arr = [];
    //TEMP_arr = [];
    for (let item of data){
        let sensor_data = JSON.parse(item.data);
        //UV_arr.push(sensor_data.UV);
        SND_arr.push(sensor_data.Sound);
        //TEMP_arr.push(sensor_data.Temperature);


    }
    /*let x = ( UV_arr.join(", "))
    console.log([x])

    let y = ( SND_arr.join(", "))
    console.log([y])

    let z = ( TEMP_arr.join(", "))
    console.log([z])*/

    /*console.log(UV_arr);
    console.log(SND_arr);
    console.log(TEMP_arr);*/
    var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    var yValues = SND_arr.slice((SND_arr.length - 11), SND_arr.length);
const ctx = document.getElementById('myChart2').getContext('2d');
const myChart =new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,255,255,10)",
          data: yValues

        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 0, max:100}}],
        }
      }
    });


    }



async function get_sensordata3(){
    const response = await fetch("http://127.0.0.1:5000/api/dashboard",
        {
            "origins" : "*",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
    })
    const data = await response.json();
    //UV_arr = [];
    //SND_arr = [];
    TEMP_arr = [];
    for (let item of data){
        let sensor_data = JSON.parse(item.data);
        //UV_arr.push(sensor_data.UV);
        //SND_arr.push(sensor_data.Sound);
        TEMP_arr.push(sensor_data.Temperature);


    }
    /*let x = ( UV_arr.join(", "))
    console.log([x])

    let y = ( SND_arr.join(", "))
    console.log([y])

    let z = ( TEMP_arr.join(", "))
    console.log([z])*/

    /*console.log(UV_arr);
    console.log(SND_arr);
    console.log(TEMP_arr);*/
    var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    var yValues = TEMP_arr.slice((TEMP_arr.length - 11), TEMP_arr.length);
const ctx = document.getElementById('myChart3').getContext('2d');
const myChart =new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,255,255,10)",
          data: yValues

        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 0, max:100}}],
        }
      }
    });


    }