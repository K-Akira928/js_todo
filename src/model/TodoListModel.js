export class TodoListModel {
  #items;
  #itemsChangeEvent;

  constructor(items = []) {
    this.#items = items;
  }

  addItem(todoItem) {
    if (todoItem.isEmptyTitle()) return;

    this.#items.push(todoItem);

    this.#itemsChangeEvent.call(this);
  }

  deleteItem({ id }) {
    this.#items = this.#items.filter((item) => { return item.id !== id });

    this.#itemsChangeEvent.call(this);
  }

  getItems() {
    return this.#items;
  }

  addItemsChangeEvent(event) {
    this.#itemsChangeEvent = event;
  }

  removeItemsChangeEvent() {
    this.#itemsChangeEvent = '';
  }
}