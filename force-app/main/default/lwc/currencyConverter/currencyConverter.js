import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverter extends LightningElement {
    currencyIcon = currencyConverterAssets + '/currencyConverterAssets/currency.svg'

    countryList = countryCodeList
    countryFrom = 'USD'
    countryTo = 'INR'
    imgClass = 'rotate'
    amount
    result
    error

    handlerChange(event) {
        const { label, value } = event.target

        if (label === 'From') {
            this.countryFrom = value
        } else if (label === 'To') {
            this.countryTo = value
        } else {
            this.amount = value
        }
        this.result = ''
        this.error = ''
    }

    hoverHandler() {
        this.imgClass = 'stop-rotate'
    }

    leaveMouse() {
        this.imgClass = 'rotate'
    }


    submitHandler(event) {
        event.preventDefault()
        this.convert()

    }
    // https://v6.exchangerate-api.com/v6/${apiKey}/latest/${countryFrom}
    async convert() {
        const API_KEY = '2e06bfd3929116f6b31868d4'
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
        //const API_URL = 'https://v6.exchangerate-api.com/v6/2e06bfd3929116f6b31868d4/latest/USD'
        try {
            const response = await fetch(API_URL)
            const data = await response.json()
            //console.log(data)
            debugger;
            // this.result = (Number(this.amount) * jsonData.result).toFixed(2)
            this.result = (Number(this.amount) * data.conversion_rate).toFixed(2)
            
            console.log(this.result)

        } catch (error) {
            this.error = error
            console.log(error)

        }

    }
}