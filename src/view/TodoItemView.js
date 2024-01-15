import { htmlToElement } from '../util/htmlToElement.js';

export class TodoItemView {
  #todoDefaultHtml = `<li class="todo-item">
                    <input type="checkbox" class="todo-check">
                    <span class="todo-title incomplete"></span>
                    <div class="todo-controle">
                      <button id="js-todo-edit">編集</button>
                      <button class="delete" id="js-todo-delete">削除</button>
                    </div>
                  </li>`;

  #todoCompletedHtml = `<li class="todo-item">
                          <input type="checkbox" class="todo-check" checked>
                          <span class="todo-title complete"></span>
                          <div class="todo-controle">
                            <button class="delete" id="js-todo-delete">削除</button>
                          </div>
                        </li>`;

  createElement(todoItem, { todoDeleteEvent, todoCheckboxEvent }) {
    let todoItemElement;

    if (todoItem.completed) {
      todoItemElement = this.#todoCompletedElement(todoItem, { todoDeleteEvent, todoCheckboxEvent });
    } else {
      todoItemElement = this.#todoDefaultElement(todoItem, { todoDeleteEvent, todoCheckboxEvent });
    }

    return todoItemElement;
  }

  #todoDefaultElement(todoItem, { todoDeleteEvent, todoCheckboxEvent }) {
    const todoItemElement = htmlToElement(this.#todoDefaultHtml);
    todoItemElement.querySelector('.todo-title').textContent = todoItem.title;

    this.#deleteAddEventListener(todoItemElement, todoItem, todoDeleteEvent);
    this.#checkboxAddEventListener(todoItemElement, todoItem, todoCheckboxEvent);

    return todoItemElement;
  }

  #todoCompletedElement(todoItem, { todoDeleteEvent, todoCheckboxEvent }) {
    const todoItemElement = htmlToElement(this.#todoCompletedHtml);
    todoItemElement.querySelector('.todo-title').textContent = todoItem.title;

    this.#deleteAddEventListener(todoItemElement, todoItem, todoDeleteEvent);
    this.#checkboxAddEventListener(todoItemElement, todoItem, todoCheckboxEvent);

    return todoItemElement;
  }

  #deleteAddEventListener(todoItemElement, todoItem, todoDeleteEvent) {
    const todoDeleteButtonElement = todoItemElement.querySelector('#js-todo-delete');
    todoDeleteButtonElement.addEventListener('click', () => {
      todoDeleteEvent({ id: todoItem.id });
    });
  }

  #checkboxAddEventListener(todoItemElement, todoItem, todoCheckboxEvent) {
    const todoCheckboxElement = todoItemElement.querySelector('.todo-check');
    todoCheckboxElement.addEventListener('change', () => {
      todoCheckboxEvent({ id: todoItem.id, completed: !todoItem.completed });
    });
  }
}