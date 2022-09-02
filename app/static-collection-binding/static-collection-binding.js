import {data} from "./data.js";

export default class StaticCollectionBinding extends crsbinding.classes.ViewBase {
    async connectedCallback() {
        await super.connectedCallback();
        const template = this._element.querySelector("#list-template");
        crsbinding.inflationManager.register("list-template", template);
    }

    async disconnectedCallback() {
        crsbinding.inflationManager.unregister("list-template");
        await super.disconnectedCallback();
    }

    async render() {
        const ul = this._element.querySelector("ul");
        const fragment = crsbinding.inflationManager.get("list-template", data);
        ul.appendChild(fragment);
    }
}