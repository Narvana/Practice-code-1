//creating a seach form
const weatherForm=document.querySelector('form')
const search=document.querySelector('input');
const messageone=document.querySelector('#message-1');
const messagetwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;
    // console.log(location)
fetch(`/weather?address=${location}`).then((response)=>{
response.json().then((data)=>{
if(data.error)
{
    messageone.textContent=data.error;
}
else{
    messageone.textContent=data.location;
    messagetwo.textContent=data.forecast;
}
})
})
})

// https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=99ea73ce47a2f0fc58d128e0acbab824&units=metric
// 'https://puzzle.mead.io/puzzle'