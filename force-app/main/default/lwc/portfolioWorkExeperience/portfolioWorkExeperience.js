import { api, LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class PortfolioWorkExeperience extends LightningElement {

    @api recordId
    WorkExperienceData = []

    @wire(getRelatedListRecords, {
            parentRecordId: '$recordId',
            relatedListId: 'WorkExperience__r',
            fields: [
                'WorkExperience__c.JobStartDate__c',
                'WorkExperience__c.JobEndDate__c',
                'WorkExperience__c.Role__c',
                'WorkExperience__c.CompanyName__c',
                'WorkExperience__c.WorkLocation__c',
                'WorkExperience__c.is_Current__c',
                'WorkExperience__c.Description__c'
            ]
     })workExperienceHandler({data, error}){

        if(data){
            //console.log(JSON.stringify(data))
            this.formateWorkExperienceData(data)
        }
        if(error){
            console.error(error)
        }
     }

    formateWorkExperienceData(data){
        this.WorkExperienceData = [...data.records].reverse().map(item=>{
            let id = item.id
            const {JobStartDate__c,JobEndDate__c,Role__c,CompanyName__c,WorkLocation__c,is_Current__c,Description__c} = item.fields
            let StartDate = this.getValue(JobStartDate__c)
            let EndDate = this.getValue(JobEndDate__c)
            let Role = this.getValue(Role__c)
            let CompanyName = this.getValue(CompanyName__c)
            let WorkLocation = this.getValue(WorkLocation__c)
            let IsCurrent = this.getValue(is_Current__c)
            let Description = this.getValue(Description__c)

            return {id,StartDate,EndDate,Role,CompanyName,WorkLocation,IsCurrent,Description}
        })

        console.log(JSON.stringify(this.WorkExperienceData))
    }

    getValue(data){
        return data && (data.value || data.displayValue)
    }
}