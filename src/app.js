const path=require('path')
const express=require('express')
const app=express();
const request=require('request');
const port=process.env.PORT || 3000
// app.get('',(req,res)=>{
//     res.send('Hello express')
// })

// app.get('/help',(req,res)=>{
//     res.send('help available')
// })

// app.get('/about',(req,res)=>{
//     res.write('<h1>about us</h1>')
//     res.write('Student Studing for Web Development')
// })

// app.get('/weather',(req,res)=>{
//     res.send(
//         [
//             {
//                 Delhi:'Rain'
//             },
//             {
//                 Faridabad:'Sunny'
//             },
//             {
//                 Chennai:'Cloudy'
//             }])
// })

// console.log(__dirname)
// console.log(path.join(__dirname,'../static'));

//static 
const publicDirectoryPath=path.join(__dirname,'../static');
app.use(express.static(publicDirectoryPath));

//dynamic using views 
// app.set("view engine","hbs");
// app.get("",(req,res)=>{
//     res.render("index",{
//         name:'Jagdish'
//     });
// });

// app.get('/about',(req,res)=>{
//     res.render('about',{
//         name:'Jagdish',
//         status:"Unemployed"
//     })
// })

//dynamic not using views
// const temppath=path.join(__dirname,"../temp")
// app.set("view engine","hbs");
// app.set("views",temppath);

// app.get("",(req,res)=>{
//     res.render("index",{
//         name:'Jagdish'
//     });
//   });
// app.get('*',(req,res )=>{
//   res.render('404',{
//        status:'Page Not Found '
//   });
// })
// app.get('/about',(req,res)=>{
//     res.render('about',{
//         name:'Jagdish',
//         status:"Unemployed"
//     })
// })
// app.get('/about/*',(req,res )=>{
//     res.render('404',{
//          status:'Page Not Found '
//     });
// })


//partials
const hbs=require('hbs');
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials")
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);

app.get("",(req,res)=>{
    res.render("index",{
        name:'Jagdish'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Jagdish',
        status:"Unemployed"
    })
})

app.get('/about/*',(req,res)=>{
res.render('404',{
  status:404  
})
})

// app.get('/weather',(req,res)=>{
//     // console.log(req.query);
//     // console.log(req.query.name);
// if(!req.query.name)
// {
// return res.send(`Error. Provide a Location`)
// }
// else
// {
//     url=`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=99ea73ce47a2f0fc58d128e0acbab824&units=metric`    
//     request({url:url},(err,response)=>{
//     // console.log(response);
//     const data=JSON.parse(response.body);
//     // console.log(data)
//     console.log(`city name is ${data.name} & temp is ${data.main.temp}`)

//     res.send({
//         forecast:data.weather[0].main,
//         location:data.name,
//         Temperature:data.main.temp
//     });
//     })
// }
// })


const forecast=require('./forecast')
const geocode=require('./geocode')

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send( {Error:'Enter a location'})
    }       
      
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
  if(error)
          {
            return res.send({error});
          }
        
    forecast(latitude,longitude, (error, forecastdata) => {
        if(error){
            return res.send({error});
        }
          res.send({
            location,
            forecast:forecastdata,
            address:req.query.address
      })
    })
  })
})

app.get('*',(req,res )=>{
    res.render('404',{
         status:'Page Not Found '
    });
})

app.listen(port,()=>{
    console.log('Server is up on port 3000.')
}
)


// app.locals property
// app.locals.name='Jagdish'
// app.locals.age=23
// app.locals.company='none'
// console.log(app.locals.name)
// console.log(app.locals)


//app.mouthpath 
// const user=express()
//  user.get('/',function(req,res){
//     console.log(user.mountpath)
//     res.send('user hompage')
//  })
//  app.use('/user',user);
//  app.listen(3000,(err)=>{
//     if(err)
//     console.log(err);
// console.log("server listening",3000);

//  })