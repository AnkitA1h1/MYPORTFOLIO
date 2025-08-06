import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClock extends LightningElement {

    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png'
    alarmSound = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3')
    currentTime = ''
    hour = []
    minutes = []
    meridiems =['AM', 'PM']
    selectHour
    selectMinutes
    selectMeridiem
    alarmTime
    isAlarmSet = false
    isAlarmTriggered = false

    get ifFieldNotSelected(){
        return !(this.selectHour && this.selectMinutes && this.selectMeridiem)
    }

    get shakeImg(){
        return this.isAlarmTriggered ? 'shake' : ''
    }

    connectedCallback() {
        this.createHoursOptions()
        this.createMinutesOptions()
        this.currentTimeHandler()
    }

    currentTimeHandler() {
        setInterval(() => {
            let hour = new Date().getHours()
            let minute = new Date().getMinutes()
            let second = new Date().getSeconds()
            let ampm = 'AM'
            if (hour === 0) {
                hour = 12;
                ampm = "AM";
            } else if (hour === 12) {
                ampm = "PM";
            } else if (hour >= 12) {
                hour = hour - 12;
                ampm = "PM";
            }

            hour < 10 ? hour = '0' + hour : hour = hour
            minute < 10 ? minute = '0' + minute : minute = minute
            second < 10 ? second = '0' + second : second = second

            this.currentTime = `${hour}:${minute}:${second} ${ampm}`

            if(this.alarmTime === `${hour}:${minute} ${ampm}`){
                console.log('alarm triggered')
                this.isAlarmTriggered = true
                this.alarmSound.play()
                this.alarmSound.loop = true
            }

        }, 1000)
    }

    createHoursOptions(){
        for (let i = 1; i <=12; i++) {
            let option = i<10 ? '0' + i : i;
            this.hour.push(option)
        }
    }

    createMinutesOptions(){
        for (let i = 0; i <=59; i++) {
            let option = i<10 ? '0' + i : i;
            this.minutes.push(option)
        }
    }


    optionhandler(event){
        let label = event.detail.label
        if(label === 'Hour(s)'){
            this.selectHour = event.detail.value
        }else if(label === 'minute(s)'){
            this.selectMinutes = event.detail.value
        }else if(label === 'AM/PM'){
            this.selectMeridiem = event.detail.value
        }

    }


    setAlarmHandler(event){
        this.alarmTime = `${this.selectHour}:${this.selectMinutes} ${this.selectMeridiem}`
        this.isAlarmSet = true
    }

    clearAlarmHandler(event){
        this.isAlarmSet = false
        this.alarmTime = ''
        this.isAlarmTriggered = false
        this.alarmSound.pause()
        const elements = this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elements).forEach(element =>{
            element.reset('')
        })

    }
}