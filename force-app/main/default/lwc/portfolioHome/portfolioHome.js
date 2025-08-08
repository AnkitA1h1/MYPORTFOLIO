import { LightningElement, wire, api} from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
import xIcon from '@salesforce/resourceUrl/xIcon';
import { getRecord, getFieldValue} from 'lightning/uiRecordApi';
import FULLNAME from '@salesforce/schema/Portfolio__c.FullName__c'
import DESTINATION from '@salesforce/schema/Portfolio__c.Destination__c'
import COMPANY_NAME from '@salesforce/schema/Portfolio__c.CompanyName__c'
import COMPANY_LOCATION from '@salesforce/schema/Portfolio__c.CompanyLocation__c'

export default class PortfolioHome extends LightningElement {

    @api recordId //= 'a01gK00000Fb507QAB'
    @api linkedinUrl //= 'https://www.linkedin.com/in/ankitak98/'
    @api xUrl //= 'https://www.linkedin.com/in/ankitak98/'
    @api githubUrl //= 'https://github.com/AnkitA1h1'
    @api trailheadUrl //= 'https://www.salesforce.com/trailblazer/ankitak98'
    @api youTubeUrl //= 'https://www.linkedin.com/in/ankitak98/'
    @api blogUrl //= 'https:

    profilePic = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
    linkedinIcon = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
    xIcons = xIcon;
    githubIcon = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
    trailheadIcon = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;
    youTubeIcon = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`;
    blogIcon = `${PortfolioAssets}/PortfolioAssets/Social/blogger.svg`;

    ranks = `${PortfolioAssets}/PortfolioAssets/Ranks/Mountaineer.png`;

    
    @wire(getRecord,{recordId:'$recordId', fields:[FULLNAME,DESTINATION, COMPANY_NAME, COMPANY_LOCATION]})
    portFoilioDta
    // portfolioHandler({data,error}){
    //     if(data){
    //         console.log("Data:"+JSON.stringify(data));
    //     }
    //     if(error){
    //         console.log("Error:"+error);
    //     }
    // }
    
    get FullName(){
        return getFieldValue(this.portFoilioDta.data,FULLNAME);
    }
    
    get Destination(){
        return getFieldValue(this.portFoilioDta.data,DESTINATION);
    }

    get CompanyName(){
        return getFieldValue(this.portFoilioDta.data,COMPANY_NAME);
    }

    get CompanyLocation(){
        return getFieldValue(this.portFoilioDta.data,COMPANY_LOCATION);
    }
}