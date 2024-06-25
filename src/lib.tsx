import ReactDOM from 'react-dom/client';
import App, {ChildRef} from "./App";

class ZeebeModeler extends HTMLElement {
  static readonly observedAttributes = [];

  container: HTMLElement;
  root: ReactDOM.Root;
  child: ChildRef | null = null;

  constructor() {
    super();

    this.container = this;
    this.root = ReactDOM.createRoot(this.container);
  }

  get xml(): Promise<string | undefined> {
    return this.child?.xml() ?? Promise.resolve(undefined);
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
    this.root.render(<App ref={(childComponent) => {
      this.child = childComponent
    }}
    />);
  }
}

customElements.define("zeebe-modeler", ZeebeModeler);