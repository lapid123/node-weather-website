const request  = require('request')

const forecast = (latitude,longtitude,callback)=>{
    const darkskyURL = 'https://api.darksky.net/forecast/b767d789ea1ecdd5dc54fecc7c043cb3/'+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude)
    request({url: darkskyURL,json:true},(error,response) =>{
            if (error){
                callback('Unable to connect to weather services!')
            }
            else if(response.body.error){
                callback('Unable to find correct cordinates, Please try another location')
            }else {
                callback(undefined,response.body.daily.summary)
            }
    })
}

module.exports = forecast