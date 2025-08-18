import { LightningElement } from 'lwc';
import ProjectImage from '@salesforce/resourceUrl/ProjectImage'
export default class PortfolioPersonalProject extends LightningElement {

    BmiCalculator = `${ProjectImage}/ProjectImage/bmiCalculator.png`
    AlarmClock = `${ProjectImage}/ProjectImage/alarmClock.png`
    CurrencyConverter = `${ProjectImage}/ProjectImage/currencyConverter.png`
    Weather = `${ProjectImage}/ProjectImage/weather.png`
    Note = `${ProjectImage}/ProjectImage/note.png`
    Survey = `${ProjectImage}/ProjectImage/survey.png`


    project = [
        {
            "name": 'BMI Calculator',
            'image': this.BmiCalculator,
            'links': 'https://ankit-portfolio-dev-ed.develop.my.site.com/bmi-calculator'
        },
        {
            "name": 'Alarm Clock',
            'image': this.AlarmClock,
            'links': 'https://ankit-portfolio-dev-ed.develop.my.site.com/alarm-clock'
        },
        {
            "name": 'Currency Converter',
            'image': this.CurrencyConverter,
            'links': 'https://ankit-portfolio-dev-ed.develop.my.site.com/currency-converter'
        },
        {
            "name": 'Weather',
            'image': this.Weather,
            'links': 'https://ankit-portfolio-dev-ed.develop.my.site.com/weather-app'
        },
        {
            "name": 'Note',
            'image': this.Note,
            'links': 'https://ankit-portfolio-dev-ed.develop.my.site.com/notes-app'
        },
        {
            "name": 'Survey',
            'image': this.Survey,
            'links': 'https://ankit-portfolio-dev-ed.develop.my.site.com/survey/survey/runtimeApp?invitationId=0KigK0000000Hgn&surveyName=portfolio_feedback_form&UUID=3fe1de27-da83-4558-9e2e-00a0434317ed'
        }
    ]

}