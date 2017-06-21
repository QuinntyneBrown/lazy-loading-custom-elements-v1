declare var System: any;



export class AboutPageComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [];
    }

    async connectedCallback() {

        const assets = Promise.all([
            System.import("./about-page.component.html"),
            System.import("./about-page.component.scss"),
        ]);

        var results = await assets;

        const template = document.createElement("template");
        template.innerHTML = `<style>${results[1]}</style>${results[0]}`;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'aboutpage');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {

    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }
}

customElements.define(`ce-about-page`,AboutPageComponent);
