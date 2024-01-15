let itemId = 0;

export class TodoItemModel {
  id;
  title;
  completed;
  edit;

  constructor({ title, completed, edit }) {
    this.id = itemId++;
    this.title = title;
    this.completed = completed;
    this.edit = edit;
  }

  isEmptyTitle() {
    return this.title.length === 0;
  }
}