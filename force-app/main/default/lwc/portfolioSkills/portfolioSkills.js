import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_SKILLS from '@salesforce/schema/Portfolio__c.TechnicalSkills__c';
import SOFTWARE_SKILLS from '@salesforce/schema/Portfolio__c.SoftwareTools__c';
import METHODOLOGIES_SKILLS from '@salesforce/schema/Portfolio__c.SoftwareDevlopementMethodologies__c';


export default class PortfolioSkills extends LightningElement {
    @api recordId;
    TechnialSkills = [];
    SoftwareSkills = [];
    MethodologiesSkills = [];

    

    @wire(getRecord,{
        recordId: '$recordId',
        fields: [TECH_SKILLS,SOFTWARE_SKILLS,METHODOLOGIES_SKILLS]

    })getSkillsHandler({data, error}){
        if(data){
            //console.log(JSON.stringify(data));
            this.foramtSkills(data);
        }
        if(error){
            console.error(error);
        }
    }


    foramtSkills(data){

        const {TechnicalSkills__c,SoftwareTools__c,SoftwareDevlopementMethodologies__c} = data.fields
        this.TechnialSkills = TechnicalSkills__c ? (TechnicalSkills__c.value).split(',') : [];
        this.SoftwareSkills = SoftwareTools__c ? (SoftwareTools__c.value).split(',') : [];
        this.MethodologiesSkills = SoftwareDevlopementMethodologies__c ? (SoftwareDevlopementMethodologies__c.value).split(',') : [];
        
    }
}