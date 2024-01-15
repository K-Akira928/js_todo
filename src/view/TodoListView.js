import { TodoItemView } from './TodoItemView.js';

export class TodoListView {
  createElement(todoItems, { todoDeleteEvent, todoCheckboxEvent }) {
    const todoItemView = new TodoItemView();
    const todoListElement = document.createElement('ul');

    todoItems.forEach((todoItem) => {
      const todoItemElement = todoItemView.createElement(todoItem, { todoDeleteEvent, todoCheckboxEvent });
      todoListElement.appendChild(todoItemElement);
    });

    return todoListElement;
  }

  render(todoContainerElement, todoListElement) {
    todoContainerElement.innerHTML = '';
    todoContainerElement.appendChild(todoListElement);
  }
}