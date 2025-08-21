import { api, LightningElement } from 'lwc';

export default class PortfolioAppendHtml extends LightningElement {
    @api content

    isLoaded = false

    renderedCallback(){
        const container = this.template.querySelector('.content')
        container.innerHTML = this.content
        this.isLoaded = true
        
    }
}