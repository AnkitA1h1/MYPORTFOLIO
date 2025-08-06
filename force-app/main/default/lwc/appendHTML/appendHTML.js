import { api, LightningElement } from 'lwc';

export default class AppendHTML extends LightningElement {
    _result
    loaded

    @api
    get result(){
        return this._result;
    }
    set result(data){
        this._result = data;
        if(this.loaded){
            this.attachHTML();
        }
    }

    renderedCallback(){
        if(this._result && !this.loaded){
            this.attachHTML();
        }
        
    }

    attachHTML(){
        
        const htmlContainer = this.template.querySelector('.htmlContainer')
        if(htmlContainer){
            htmlContainer.innerHTML = this.result;
            this.loaded = true;
        }
    }
}