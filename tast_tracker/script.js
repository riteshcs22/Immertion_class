document.getElementById("add-btn").addEventListener("click", addTodo);

const todoList = [];

function addTodo() {
  const input = document.getElementById("todo-input");
  const priority = document.getElementById("priority-select").value;
  const value = input.value.trim();

  if (value === "") return;
  todoList.push({ task: value, priority });

  renderTodos();

  input.value = "";
}

function renderTodos() {
  const ul = document.getElementById("todo-list");
  ul.innerHTML = "";

  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTodos = todoList.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  for (const item of sortedTodos) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = item.task;

    const badge = document.createElement("span");
    badge.className = `priority priority-${item.priority}`;
    badge.textContent = item.priority.toUpperCase();

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      const index = todoList.indexOf(item);
      if (index !== -1) {
        todoList.splice(index, 1);
        renderTodos();
      }
    };

    li.appendChild(textSpan);
    li.appendChild(badge);
    li.appendChild(delBtn);

    ul.appendChild(li);
  }
}
