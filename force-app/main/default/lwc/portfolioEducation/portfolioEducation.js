import { api, LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const COLUMNS = [
    { label: 'Education', fieldName: 'Qualification' },
    { label: 'Institute Name', fieldName: 'InstituteName' },
    { label: 'Passing Year', fieldName: 'PassingYear' }
];

export default class PortfolioEducation extends LightningElement {
    @api recordId;
    Education = [];

    columns = COLUMNS;

    @wire(getRelatedListRecords,{
        parentRecordId:'$recordId',
        relatedListId:'Education__r',
        fields:[
            'Education__c.Qualification__c',
            'Education__c.InstituteName__c',
            'Education__c.Passing_Year__c'
        ]
    })educationHandler({data,error}){
        if(data){
            this.formatEducationData(data);
            console.log(this.Education[0].id);
        }
        if(error){
            console.error(error);
        }
    }


    formatEducationData(data){
        this.Education = data.records.map(item=>{
            let id = item.id;
            const {Qualification__c,InstituteName__c,Passing_Year__c} = item.fields;
            let Qualification = this.getValue(Qualification__c);
            let InstituteName = this.getValue(InstituteName__c);
            let PassingYear = this.getValue(Passing_Year__c);

            return {
                id,
                Qualification,
                InstituteName,
                PassingYear
            }

        })
    }

    getValue(field){
        return field && (field.value || field.displayValue)
    }
}