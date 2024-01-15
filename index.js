import { TodoApp } from './src/TodoApp.js';
const todoCreateFormElement = document.querySelector('#js-todo-create-form');
const todoCreateInputElement = document.querySelector('#js-todo-create-input');
const todoContainerElement = document.querySelector('#js-todo-container');

const todoAllCountElement = document.querySelector('#js-todo-all-count');
const todoCompletedCountElement = document.querySelector('#js-todo-completed-count');
const todoIncompletedCountElement = document.querySelector('#js-todo-incompleted-count');

const todoApp = new TodoApp({
  todoCreateFormElement,
  todoCreateInputElement,
  todoContainerElement,
  todoAllCountElement,
  todoCompletedCountElement,
  todoIncompletedCountElement
});

window.addEventListener('load', () => {
  todoApp.mount();
});