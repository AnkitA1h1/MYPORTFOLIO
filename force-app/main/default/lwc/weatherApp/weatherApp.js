import { LightningElement } from 'lwc';

import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons';
import getWeatherInfo from '@salesforce/apex/WeatherAppController.getWeatherInfo';

const API_KEY = 'e125d1e609f9c870ee27f475a0cc0679';
export default class WeatherApp extends LightningElement {
    backArrowIcon = WEATHER_ICONS + '/weatherAppIcons/arrow-back.svg'
    clearCloudIcon = WEATHER_ICONS + '/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICONS + '/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICONS + '/weatherAppIcons/droplet.svg'
    mapIcon = WEATHER_ICONS + '/weatherAppIcons/map.svg'
    rainIcon = WEATHER_ICONS + '/weatherAppIcons/rain.svg'
    snowIcon = WEATHER_ICONS + '/weatherAppIcons/snow.svg'
    stormIcon = WEATHER_ICONS + '/weatherAppIcons/storm.svg'
    thermometerIcon = WEATHER_ICONS + '/weatherAppIcons/thermometer.svg'
    hazeIcon = WEATHER_ICONS + '/weatherAppIcons/haze.svg'

    back ='background'

    cityName = ''
    successText = ''
    errorText = ''
    isError = false
    response
    weatherIcon

    searchHandler(event) {
        this.cityName = event.target.value;

    }

    submitHandlet(event) {
        event.preventDefault();
        this.fetchData();
    }

    async fetchData() {
        this.isError = false;
        this.successText = 'Feching city details....';

        try{
            const response = await getWeatherInfo({cityName: this.cityName});
            this.successText = 'Feching city details....';
            this.resposeCode(JSON.parse(response))
        }catch(error){
            console.log(error);
            this.successText = '';
            this.errorText = 'Something Went wrong';
            this.isError = true;
        }
        /*const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`

        try {
            const response = await fetch(url);
            const data = await response.json();
            this.successText = 'Feching city details....';
            this.resposeCode(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }*/


    }

    resposeCode(info){
         if(info.cod === '404'){
            this.successText = ''
            this.errorText = 'City not found';
            this.isError = true;
        }else{
            this.successText = '';
            this.isError = false;
            const temprature = Math.round(info.main.temp)
            const city = info.name 
            const country = info.sys.country
            const {feels_like, humidity} = info.main
            const {description, id} = info.weather[0]
            if(id === 800){
                this.weatherIcon = this.clearCloudIcon
            }else if(id >= 200 || id <= 232){
                 this.weatherIcon = this.stormIcon
            }else if(id >= 500 || id <= 531){
                 this.weatherIcon = this.rainIcon
            }else if(id >= 600 || id <= 622){
                 this.weatherIcon = this.snowIcon
            }else if(id >= 701 || id <= 781){
                 this.weatherIcon = this.hazeIcon
            }else if(id >= 801 || id <= 804){
                 this.weatherIcon = this.cloudIcon
            }

            this.response = {
                temp:  temprature,
                city: city,
                country: country,
                feels_like: Math.round(feels_like),
                humidity: humidity,
                description: description
            }
        }  
    }

    backHandler(){
        this.response= null
    }
}