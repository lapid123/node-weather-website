
const path = require('path')
const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Omri Lapid'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        name: "Omri Lapid"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page!",
        helpText: "Wellcome to the help page!",
        name: "Omri Lapid"
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude,longtitude,location} = {})=>{
            if (error){
                return res.send({error})
            }

            forecast(latitude,longtitude,(error,forecastData)=>{
                if (error){
                    return res.send({error})
                }

                res.send({
                    forecast:forecastData,
                    location: location,
                    address: req.query.address
                })
            })
     })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Omri Lapid',
        errorMessage: 'Help articale not found!'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Omri Lapid',
        errorMessage: 'Page not found!'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
