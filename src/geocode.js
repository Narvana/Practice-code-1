const request=require('request')

const geocode=(address,callback)=>{

    const url='https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&appid=99ea73ce47a2f0fc58d128e0acbab824&units=metric';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to find the loaction server',undefined);
        }else if(response.body.cod==404){
            callback('Unable to find location. Try another search',undefined);
        }else{
            callback(undefined,{
                latitude:response.body.coord.lat,
                longitude:response.body.coord.lon,
                location:response.body.name+','+response.body.sys.country
            })
        }
    }) 
}

module.exports=geocode;