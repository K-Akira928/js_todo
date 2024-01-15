let itemId = 0;

export class TodoItemModel {
  id;
  title;
  completed;

  constructor({ title, completed }) {
    this.id = itemId++;
    this.title = title;
    this.completed = this.completed;
  }

  isEmptyTitle() {
    return this.title.length === 0;
  }
}