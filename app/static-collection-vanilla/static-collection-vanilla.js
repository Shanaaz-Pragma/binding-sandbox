export default class StaticCollectionVanilla extends crsbinding.classes.ViewBase {
    async connectedCallback() {
        await super.connectedCallback();
        this._data = await fetch("/app/static-collection-vanilla/data.json").then( res => res.json());
        this._button = document.querySelector("#render-button");
        this._renderHandler = this._render.bind(this);
        this._button.addEventListener("click", this._renderHandler);
    }

    async disconnectedCallback() {
        this._button.removeEventListener("click", this._renderHandler);
        this._renderHandler = null;
        this._button = null;
        this._data = null;
        await super.disconnectedCallback();
    }

    async _render() {
        const template = document.querySelector("#list-template");
        const ul = document.querySelector("ul");
        const fragment = document.createDocumentFragment();

        for (const item of this._data) {
            const instance = template.content.cloneNode(true);
            const li = instance.querySelector("li");
            const name = instance.querySelector("#name");
            const age = instance.querySelector("#age");
            name.textContent = `${item.firstname} ${item.lastname}`;
            age.textContent = `${item.age}`;

            if(item.age < 50) {
                li.style.color = 'blue';
            }
            else {
                li.style.color = 'red';
            }

            fragment.appendChild(instance);
        }

        ul.appendChild(fragment);
    }
}