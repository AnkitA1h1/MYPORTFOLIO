import { LightningElement, wire } from 'lwc';
import createNewNote from '@salesforce/apex/NoteAppController.createNewNote';
import getNotes from '@salesforce/apex/NoteAppController.getNotes';
import updateNoteRecord from '@salesforce/apex/NoteAppController.updateNoteRecord';
import {refreshApex} from '@salesforce/apex';
import deleteNoteRecord from '@salesforce/apex/NoteAppController.deleteNoteRecord';
import LightningConfirm from 'lightning/confirm';

const INTIAL_STATE = {
    Name: '',
    Note_Description__c: '',
}
export default class NoteTakingApp extends LightningElement {

    noteRecord = INTIAL_STATE;
    fetchNotesRecord = []
    showModal = false;
    selectRecordId
    wiredNoteResult

    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'clean',
        'table',
        'header',
        'color',
    ];

    get noteOperation(){
        return this.selectRecordId ? 'Update Note' : "Add Note"
    }

    @wire(getNotes)
    getNotesData(result) {
        this.wiredNoteResult = result;
        const { data, error } = result;
        if (data) {
            //console.log(JSON.stringify(data));
            this.fetchNotesRecord = data.map(item => {
                let formatDate = new Date(item.LastModifiedDate).toDateString();
                return { ...item, formatDate };
            });
            console.log(JSON.stringify(this.fetchNotesRecord));
        }
        if (error) {
            console.log(error.message.body);
            showNotification(error.message.body, 'error');
        }
    }

    get isTrue() {
        return !(this.noteRecord && this.noteRecord.Name && this.noteRecord.Note_Description__c);
    }

    createNoteHandler() {
        this.showModal = !this.showModal;
    }

    closeNoteHandler() {
        this.showModal = false;
        this.noteRecord = INTIAL_STATE;
        this.selectRecordId  = null;
    }

    changeHandler(event) {
        const { name, value } = event.target;
        this.noteRecord = {
            ...this.noteRecord,
            [name]: value
        }
    }

    noteSaveHandler(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.noteRecord))
        if(this.selectRecordId){
            this.noteUpdate(this.selectRecordId);
        }else{
            this.createNote();
        }
        
    }

    createNote() {
        createNewNote({ title: this.noteRecord.Name, description: this.noteRecord.Note_Description__c }).then(() => {
            this.showModal = false;
            let message = `${this.noteRecord.Name} created successfully!`
            this.showNotification(message, 'success');
            this.noteRecord = INTIAL_STATE;
            this.refresh();
        }).catch(error => {
            console.log(error.message.body);
            let message = `${this.noteRecord.Name} creation failed! \n ${error.message.body}`
            this.showNotification(message, 'error');
        })
    }

    showNotification(message, varient) {
        const element = this.template.querySelector('c-notification');
        if (element) {
            element.handleShowNotification(message, varient);
        }
    }

    editNoteHandler(event) {
        
        const { recordid } = event.target.dataset;
        const noteRecord = this.fetchNotesRecord.find(item => item.Id === recordid)
        this.noteRecord = {
            Name: noteRecord.Name,
            Note_Description__c: noteRecord.Note_Description__c
        }

        this.selectRecordId = recordid;
        this.showModal = true;
    }

    noteUpdate(noteId){
        const {Name,Note_Description__c} = this.noteRecord;
        updateNoteRecord({"noteId":noteId, "title":Name, "description":Note_Description__c}).then(() =>{
            this.showModal = false;
            let message = `${this.noteRecord.Name} updated successfully!`
            this.showNotification(message, 'success');
            this.noteRecord = INTIAL_STATE;
            this.selectRecordId = null; 
            this.refresh();
        }).catch(error => {
            console.log(error.message.body);
            showNotification(error.message.body, 'error');

        })
    }

    refresh(){
        return refreshApex(this.wiredNoteResult);
    }

    deleteNoteHandler(event){
        this.selectRecordId = event.target.dataset.recordid;
        this.confirmDelete();
            
    }


    async confirmDelete(){
        const confirm = await LightningConfirm.open({
            message: 'Are you sure you want to delete this note?',
            variant: 'error',
            label: 'Delete Note'
        })

        if(confirm){
            this.deleteNote();
        }else{
            this.selectRecordId = null;
        }
        
    }

    deleteNote(){
        deleteNoteRecord({"noteId":this.selectRecordId}).then(() => {
            let message = `Note deleted successfully!`
            this.showNotification(message, 'success');
            this.selectRecordId = null;
            this.refresh();

        }).catch(error => {
            console.log(error.message.body);
            showNotification(error.message.body, 'error');

        })
           
    }
}