const api="6ab24fdc5a01768cb86346cc86335dca";
console.log("connected");
const maincontent=document.getElementsByClassName("main-content")[0];
const button=document.getElementById("search");

const set = new Set();

button.addEventListener("submit",function(Event){
     Event.preventDefault();
const cityname=document.getElementById("cityname");

    const city = cityname.value;

    set.add(city);
    console.log(set);
    weatherReport();
   


})
async function weatherReport(){
    const weatherData= [];
    for(const city of set){
        const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
       const response= await fetch(apiurl);
       const result= await response.json();
       console.log(result);   
       const obj={
        name:`${result.name}`,
        type:`${result.weather[0].main}`,
        temp:`${result.main.temp}`,
        tempmin:`${result.main.temp_min}`,
        tempmax:`${result.main.temp_max}`,
        humidity:`${result.main.humidity}`,
        pressure:`${result.main.pressur}`,
        winds:`${result.wind.speed}`,
        deg:`${result.wind.deg}`,
        cloudp:`${result.clouds.all}`,
        code:`${result.sys.country}`,
        sunrise:`${result.sys.sunrise}`,
        sunset:`${result.sys.sunset}`

        }  
        weatherData.push(obj); 
   
    }
    weatherData.sort((a,b)=> a.temp-b.temp);
    console.log(weatherData);
    maincontent.innerHTML="";
    weatherData.forEach((value)=>{
        const weathertype =getWeatherImage(value.type);
        console.log(weathertype);

    
    const griditem=document.createElement("div");
    griditem.innerHTML =`
    <div class="item-content">
    <div style="float: right;"><img src=${weathertype} style="height:20vh"></div>
         <div style="color:white;"><i class="fa-solid fa-gauge-simple-high" style="color: #ffffff;"></i>${value.winds}km/h <br>
         <i class="fa-regular fa-compass" style="color: #f7f7f8;"></i>${value.deg}
       </div>
      <div style="color:rgb(247, 243, 243) ;"> <i class="fa-solid fa-droplet" style="color: #ffffff;"></i>${value.cloudp}</div>
       <div style="padding-top:20px; font-size:35px;">${value.temp}<sup style="font-size: 20px;">o</sup></div>
       <div style="font-size:15px; color:rgba(250, 241, 241, 0.911); padding-left:5px;padding-top:8px;"><b>H:${value.tempmin}</b><sup>o</sup><b>L:${value.temp_max}</b><sup>o</sup> </div>
       <div style="font-size:15px; color:rgba(250, 241, 241, 0.911); padding-left:5px;"><b>Humidity:${value.humidity} pressure:${value.pressure} </b> </div>
       <div class="shower">
           <div style="white-space: nowrap;padding: 5px; font-size: 17px;">${value.name}, ${value.code}</div>
           <div>${value.type}</div>

       </div>
   </div>
    `;
    maincontent.appendChild(griditem);
    griditem.className="grid-item";

    });
}
function getWeatherImage(type){
    if(type=="Fog"||type=="Haze"||type=="Smoke"){
        return "wind.svg"
    }
    else if(type=="Clear"||type=="Clouds"||type=="Mist"||type=="Dust"||type=="Sand"||type=="Squall"){
        return "srain.svg"
    }
    else if(type=="Drizzle"||type=="Rain"){
        return "mrain.svg"
    }
    else{
        return "Tornado.svg"
    }

    
}