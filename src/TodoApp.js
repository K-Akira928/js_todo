import { TodoListView } from "./view/TodoListView.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";

export class TodoApp {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  todoCreateFormElement;
  todoCreateInputElement;
  todoContainerElement;

  todoAllCountElement;
  todoCompletedCountElement;
  todoIncompletedCountElement;

  constructor({
    todoCreateFormElement,
    todoCreateInputElement,
    todoContainerElement,
    todoAllCountElement,
    todoCompletedCountElement,
    todoIncompletedCountElement
  }) {
    this.todoCreateFormElement = todoCreateFormElement;
    this.todoCreateInputElement = todoCreateInputElement;
    this.todoContainerElement = todoContainerElement;
    this.todoAllCountElement = todoAllCountElement;
    this.todoCompletedCountElement = todoCompletedCountElement;
    this.todoIncompletedCountElement = todoIncompletedCountElement;
  }

  #handleTodoItemAdd = (title) => {
    this.#todoListModel.addItem(new TodoItemModel({ title }));
  }

  #handleTodoCreateSubmit = (event) => {
    event.preventDefault();
    this.#handleTodoItemAdd(this.todoCreateInputElement.value);
    this.todoCreateInputElement.value = '';
  }

  #handleTodoReRender = () => {
    const todoItems = this.#todoListModel.getItems();

    const todoListElement = this.#todoListView.createElement(todoItems);
    this.#todoListView.render(this.todoContainerElement, todoListElement);
  }

  mount() {
    this.#todoListModel.addItemsChangeEvent(this.#handleTodoReRender);
    this.todoCreateFormElement.addEventListener('submit', this.#handleTodoCreateSubmit);
  }

  unmount() {
    this.#todoListModel.removeItemsChangeEvent();
    this.todoCreateFormElement.removeEventListener('submit', this.#handleTodoCreateSubmit);
  }
}