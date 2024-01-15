let itemId = 0;

export class TodoItemModel {
  id;
  title;

  constructor({ title }) {
    this.id = itemId++;
    this.title = title;
  }

  isEmptyTitle() {
    return this.title.length === 0;
  }
}