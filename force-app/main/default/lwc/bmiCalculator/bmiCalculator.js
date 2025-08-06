import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = ''
    weight = ''

    bmiCategory = ''
    bmiValue = ''
    inputHandler(event) {
        const { name, value } = event.target
        if (name === 'height') {
            this.height = value
        } else if (name === 'weight')
            this.weight = value
    }


    submitHandler(event) {
        event.preventDefault()
        console.log("height: ", this.height)
        console.log("weight: ", this.weight)
        this.calculateBMI()
    }

    calculateBMI() {
        // BMI = weight(kg) / (height(m) * height(m))

        let height = Number(this.height) / 100;

        let bmi = Number(this.weight) / (height * height)


        this.bmiValue = Number(bmi.toFixed(2))
        // BMI Category
        if (this.bmiValue < 18.5) {
            this.bmiCategory = 'Underweight'
        } else if (this.bmiValue >= 18.5 && bmi < 25) {
            this.bmiCategory = 'Normal'
        } else if (this.bmiValue >= 25 && bmi < 30) {
            this.bmiCategory = 'Overweight'
        } else {
            this.bmiCategory = 'Obese'
        }


        console.log("BMI: ", this.bmiValue)
        console.log(this.bmiCategory)
    }


    reCalculate() {
        this.height = ''
        this.weight = ''

        this.bmiCategory = ''
        this.bmiValue = ''
    }

}