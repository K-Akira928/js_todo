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

  #todoEditHtml = `<li>
                    <form class="todo-edit-form">
                      <input type="text" class="todo-title-edit" value="test">
                      <div class="todo-controle">
                        <button id="js-todo-save">保存</button>
                        <button class="delete" id="js-todo-delete">削除</button>
                      </div>
                    </form>
                  </li>`;

  createElement(todoItem, { todoDeleteEvent, todoCheckboxEvent, todoEditEvent, todoTitleSaveEvent }) {
    let todoItemElement;

    if (todoItem.edit) {
      todoItemElement = this.#todoEditElement(todoItem, { todoDeleteEvent, todoTitleSaveEvent });
    } else if (todoItem.completed) {
      todoItemElement = this.#todoCompletedElement(todoItem, { todoDeleteEvent, todoCheckboxEvent });
    } else {
      todoItemElement = this.#todoDefaultElement(todoItem, { todoDeleteEvent, todoCheckboxEvent, todoEditEvent })
    }

    return todoItemElement;
  }

  #todoDefaultElement(todoItem, { todoDeleteEvent, todoCheckboxEvent, todoEditEvent }) {
    const todoItemElement = htmlToElement(this.#todoDefaultHtml);
    todoItemElement.querySelector('.todo-title').textContent = todoItem.title;

    this.#deleteAddEventListener(todoItemElement, todoItem, todoDeleteEvent);
    this.#checkboxAddEventListener(todoItemElement, todoItem, todoCheckboxEvent);
    this.#editAddEventListener(todoItemElement, todoItem, todoEditEvent);

    return todoItemElement;
  }

  #todoCompletedElement(todoItem, { todoDeleteEvent, todoCheckboxEvent }) {
    const todoItemElement = htmlToElement(this.#todoCompletedHtml);
    todoItemElement.querySelector('.todo-title').textContent = todoItem.title;

    this.#deleteAddEventListener(todoItemElement, todoItem, todoDeleteEvent);
    this.#checkboxAddEventListener(todoItemElement, todoItem, todoCheckboxEvent);

    return todoItemElement;
  }

  #todoEditElement(todoItem, { todoDeleteEvent, todoTitleSaveEvent }) {
    const todoItemElement = htmlToElement(this.#todoEditHtml);
    const todoItemInputElement = todoItemElement.querySelector('.todo-title-edit');
    todoItemInputElement.value = todoItem.title;

    this.#saveAddEventListener(todoItemElement, todoItem, todoTitleSaveEvent);
    this.#deleteAddEventListener(todoItemElement, todoItem, todoDeleteEvent);

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

  #editAddEventListener(todoItemElement, todoItem, todoEditEvent) {
    const todoEditButtonElement = todoItemElement.querySelector('#js-todo-edit');
    todoEditButtonElement.addEventListener('click', () => {
      console.log(todoItem);
      todoEditEvent({ id: todoItem.id, edit: !todoItem.edit });
    });
  }

  #saveAddEventListener(todoItemElement, todoItem, todoTitleSaveEvent) {
    const todoSaveButtonElement = todoItemElement.querySelector('#js-todo-save');
    const todoItemInputElement = todoItemElement.querySelector('.todo-title-edit');
    todoSaveButtonElement.addEventListener('click', () => {
      todoTitleSaveEvent({ id: todoItem.id, title: todoItemInputElement.value, edit: !todoItem.edit });
    });
  }
}