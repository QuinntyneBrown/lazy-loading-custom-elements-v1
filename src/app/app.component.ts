import "./shared/header.component";
import { RouterOutlet } from "router";
import { SimpleComponent } from "simple-custom-element";

const importedElements = [SimpleComponent];

declare var System: any;

const assets = Promise.all([
    System.import("./app.component.html"),
    System.import("./app.component.scss"),
]);

export class AppRouterOutletComponent extends RouterOutlet {
    constructor(el: HTMLElement) {
        super(el);
    }

    connectedCallback() {
        this.setRoutes([
            {
                path: "/",
                name: "home-page",
                resolve: () => System.import('./home/home-page.component')
            },
            {
                path: "/about",
                name: "about-page",
                resolve: () => System.import('./about/about-page.component')
            }
        ] as any);
        super.connectedCallback();
    }
}


export class AppComponent extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        
        var results = await assets;

        const template = document.createElement("template");
        template.innerHTML = `<style>${results[1]}</style>${results[0]}`

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'app');

        this.routerOutlet = new AppRouterOutletComponent(this.routerOutletElement);        
    }

    routerOutlet: AppRouterOutletComponent;
    get routerOutletElement() { return this.shadowRoot.querySelector(".router-outlet") as HTMLElement; }
}


customElements.define(`ce-app`,AppComponent);
