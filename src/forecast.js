const request=require('request')

const forecast=(latitude,longitude,callback)=>{
const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=99ea73ce47a2f0fc58d128e0acbab824&limil=1&units=metric'
request({url:url,json:true},(error,response)=>{
 if(error){
    callback("unable to fetch data, server not connecting",undefined)
 }else if(response.body.cod==404){
    callback("Wrong coordinates, Try again",undefined)
 }else{
    callback(undefined,`${response.body.weather[0].main} throughout the day. It's currently ${response.body.main.temp} degress out.`
    )
 }
})
}
module.exports=forecast