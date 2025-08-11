import { api, LightningElement } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api resumeUrl;

    downloadResume(){
        window.open(this.resumeUrl,'_blank')
        //'https://github.com/AnkitA1h1/Ankit-Resume/blob/f3066b83407e1c1a9e2c29ead4bad8fc2a4d79de/Ankit%20Kumar%20-%20Resume.pdf'
    }
}