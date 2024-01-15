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

  createElement(todoItem) {
    const todoItemElement = htmlToElement(this.#todoDefaultHtml);
    todoItemElement.querySelector('.todo-title').textContent = todoItem.title;

    return todoItemElement;
  }
}