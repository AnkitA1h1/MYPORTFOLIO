public without sharing class NoteAppController {
    @AuraEnabled
    public static Boolean createNewNote(String title, String description){
        try{
            if(!String.isBlank(title)){
                My_Note__c newNote = new My_Note__c(
                Name = title,
                Note_Description__c=description
                );
                insert newNote;
                return true;
            }
            return false;
            
        }catch(Exception e){
            
            throw new AuraHandledException(e.getMessage());
            
        }
           
           
    }

    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getNotes(){
        return [select Id, Name, Note_Description__c, LastModifiedDate from My_Note__c order by LastModifiedDate desc];
    }

    @AuraEnabled
    public static Boolean updateNoteRecord(String noteId, String title, String description){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c updateNote = new My_Note__c();
                updateNote.Id = noteId;
                updateNote.Name = title;
                updateNote.Note_Description__c = description;
                update updateNote;
                return true;
            }

            return false;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean deleteNoteRecord(String noteId){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c deleteNote = new My_Note__c();
                deleteNote.Id = noteId;
                delete deleteNote;
                return true;
            }
            return false;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}