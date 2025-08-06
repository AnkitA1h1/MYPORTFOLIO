import { api, LightningElement } from 'lwc';

export default class Notification extends LightningElement {
    showNotification = false;
    message
    varient

    get varientClass(){
        let varient = this.varient === 'success' ? 'slds-theme_success' :
            this.varient === 'error' ? 'slds-theme_error' :
            this.varient === 'warning' ? 'slds-theme_warning' : 'slds-theme_info'

        return `slds-notify slds-notify_toast ${varient}`
    }

    @api
    handleShowNotification(message, varient) {
        this.message = message
        this.varient = varient
        this.showNotification = true;
        setTimeout(() =>{
            this.showNotification = false;
        },5000);
    }
}