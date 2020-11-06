/* eslint-disable linebreak-style */
"use strict";

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
  }

  addToStorage() {
    localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = "";
    this.todoCompleted.textContent = "";
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
    setTimeout(() => {
      document.querySelector(".animated").style.opacity = 1;
      this.todoData.forEach((element) => {
        element.animate = false;
      });
    }, 500);
  }

  createItem(todo) {
    console.log("todo: ", todo);
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.key = todo.key;
    li.animate = todo.animate;
    li.style.cssText = "transition: all 0.5s ease;";
    li.insertAdjacentHTML(
      "beforeend",
      `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `
    );

    if (todo.animate === true) {
      li.classList.add("animated");
      li.style.opacity = 0;
    }

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
        animate: false,
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert("Нельзя добавить пустое дело!");
    }
  }

  generateKey() {
    return (
      Math.random().toString(36).substr(2, 15) +
      Math.random().toString(36).substr(2, 15)
    );
  }

  editItem(item) {
    //сделал это сперва через contenteditable="true", но потом решил переделать через input + button
    const editTodo = `
      <input type="text" class="new-text" style="border:1px solid;max-width:300px"/>
      <button class="new-text-btn" type="submit">Принять</button>
    `;
    item.insertAdjacentHTML("afterbegin", editTodo);
    const newText = item.querySelector(".new-text"),
      newTextBtn = item.querySelector(".new-text-btn");

    newTextBtn.addEventListener("click", () => {
      if (newText.value.trim()) {
        this.todoData.forEach((element) => {
          if (element.key === item.key) {
            element.value = newText.value.trim();
            this.render();
          }
        });
      }
    });
  }

  deleteItem(item) {
    this.todoData.forEach((element) => {
      if (element.key === item.key) {
        this.todoData.delete(element.key);
        item.style.opacity = 0;
        setTimeout(() => {
          this.render();
        }, 500);
      }
    });
  }

  completedItem(item) {
    this.todoData.forEach((element) => {
      if (element.key === item.key) {
        element.completed = !element.completed;
        element.animate = true;
        item.style.opacity = 0;
        setTimeout(() => {
          this.render();
        }, 500);
      }
    });
  }

  handler() {
    const todoElements = document.querySelector(".todo-container");
    todoElements.addEventListener("click", (event) => {
      let target = event.target;

      if (target.matches(".todo-complete")) {
        target = target.closest(".todo-item");
        this.completedItem(target);
      } else if (target.matches(".todo-remove")) {
        target = target.closest(".todo-item");
        this.deleteItem(target);
      } else if (target.matches(".todo-edit")) {
        target = target.closest(".todo-item");
        this.editItem(target);
      }
    });
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed"
);
todo.init();
