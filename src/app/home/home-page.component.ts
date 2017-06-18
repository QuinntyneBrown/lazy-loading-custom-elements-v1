declare var System: any;

export class HomePageComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [];
    }

    async connectedCallback() {
        const assets = await Promise.all([
            System.import("./home-page.component.html"),
            System.import("./home-page.component.scss"),
        ]);

        const template = document.createElement("template");
        template.innerHTML = `<style>${assets[1]}</style>${assets[0]}`

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'homepage');

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

customElements.define(`ce-home-page`,HomePageComponent);
