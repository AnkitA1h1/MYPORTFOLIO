import { api, LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

export default class PortfolioUserStats extends LightningElement {

    @api badges 
    @api points 
    @api trails 
    @api rank 
    userRanksIcon  

    renderedCallback() {
         if(this.rank){
            this.userRanksIcon = `${PortfolioAssets}/PortfolioAssets/Ranks/${this.rank}.png`;
        }
    }

   
        
    
}