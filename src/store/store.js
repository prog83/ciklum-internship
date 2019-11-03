export default class Store {
  #reducer = null;

  #state = null;

  #callbacks = [];

  constructor(reducer, initialState) {
    this.#reducer = reducer;
    this.#state = initialState;
  }

  get state() {
    return this.#state;
  }

  async dispatch(action) {
    this.#state = await this.#reducer(this.#state, action);
    this.#callbacks.forEach(cb => cb());
  }

  subscribe(callback) {
    this.#callbacks.push(callback);
    return () => {
      this.#callbacks = this.#callbacks.filter(cb => cb !== callback);
    };
  }
}
