import ReactDOM from 'react-dom/client';
import App from "./App";

class ZeebeModeler extends HTMLElement {
  static readonly observedAttributes = [];

  container: HTMLElement;
  root: ReactDOM.Root;

  constructor() {
    super();

    this.container = this;
    this.root = ReactDOM.createRoot(this.container);
  }


  connectedCallback(): void {
    this.#render();
  }

  disconnectedCallback(): void {
    this.root.unmount()
  }

  attributeChangedCallback(): void {
    this.#render();
  }

  #render(): void {
    this.root.render(<App
    />);
  }

}

customElements.define("zeebe-modeler", ZeebeModeler);