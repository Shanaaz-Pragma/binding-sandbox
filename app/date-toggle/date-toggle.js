import {data} from "./data.js";

export default class DateToggle extends crsbinding.classes.ViewBase {
    get data() {
        return data;
    }

    set data(newValue) {
        this.setProperty("data", newValue);
    }

    get label() {
        return this.getAttribute("data-label") ?? "Start On";
    }

    set label(newValue) {
        this.setProperty("label", newValue);
    }

    get date() {
        return this.getProperty("date");
    }

    set date(newValue) {
        this.setProperty("date", newValue);
    }

    constructor() {
        super();
    }

    async connectedCallback() {
        await super.connectedCallback();
        this.label = "Start On";
        this.date = "2020/02/01 15:30:45";
        //await this._initTemplate();
    }

    async disconnectedCallback() {
        await super.disconnectedCallback();
    }

    async _toggle(e) {
        const target = e.target;
        target.setAttribute("hidden", "true");
        const wrapper = target.parentElement;
         if (wrapper.classList.contains("expanded")) {
             wrapper.classList.toggle("expanded");
             const control = wrapper.querySelector("span");
             control.removeAttribute("hidden");
         } else {
             wrapper.classList.toggle("expanded");
             const control = wrapper.querySelector("[type='date']");
             control.removeAttribute("hidden");
             control.focus();
         }
    }

    async _initTemplate() {
        /*<label>${label}</label>
        <span click.call="_toggle($event)">${date}</span>
        <input focusOut.call="_toggle($event)" type="date" hidden="true" value.bind="date" />*/
        const fragment = document.createElement("document-fragment");
        const label = document.createElement("label");
        const span = document.createElement("span");
        const input = document.createElement("input");
        label.innerText = this.label;
        this._toggleHandler = this._toggle.bind(this);
        span.addEventListener("click", this._toggleHandler);
        span.innerText = this.date;
        input.addEventListener("focusOut", this._toggleHandler);
        input.value = this.date;
        fragment.appendChild(label);
        fragment.appendChild(span);
        fragment.appendChild(input);
        this.innerHTML = fragment.content.cloneNode(true);
    }
}