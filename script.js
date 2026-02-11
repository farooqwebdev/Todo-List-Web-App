let todoInput = document.getElementById("todoInput");
let addTodoBtn = document.getElementById("addTodoBtn");
let itemsList = document.getElementById("itemsList");

// <<<<<<<<<<<< Load tasks from localStorage or initialize empty array >>>>>>>>>>
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// <<<<<<<<<<<<<<< Function to save tasks to localStorage >>>>>>>>>>>>>
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// <<<<<<<<<<<<<< Function to render tasks from array >>>>>>>>>>>>>
function renderTasks() {
  itemsList.innerHTML = ""; 

  tasks.forEach((taskObj, index) => {
    let item = document.createElement("li");
    item.className =
      "p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded-lg shadow-md flex justify-between items-center";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "mr-3 accent-pink-400 w-5 h-5 cursor-pointer";
    checkbox.checked = taskObj.done;

    let dltBtn = document.createElement("button");
    dltBtn.className =
      "px-3 py-1 bg-red-400 text-white duration-300 cursor-pointer rounded-lg hover:bg-red-700 transition-colors";
    dltBtn.innerText = "Delete";

// <<<<<<<<<<<<< Strike-through if task is done <<<<<<<<<<<<<<
    if (taskObj.done) {
      item.classList.add("line-through", "text-gray-400");
    }

    item.textContent = taskObj.text;
    item.prepend(checkbox);
    item.appendChild(dltBtn);
    itemsList.appendChild(item);

// <<<<<<<<<<<< Checkbox event >>>>>>>>>>>
    checkbox.addEventListener("change", () => {
      taskObj.done = checkbox.checked;
      saveTasks();

      if (checkbox.checked) {
        item.classList.add("line-through", "text-gray-400");
      } else {
        item.classList.remove("line-through", "text-gray-400");
      }
    });

// <<<<<<<<<<<< Delete button event >>>>>>>>>>>>
    dltBtn.addEventListener("click", () => {
      tasks.splice(index, 1); // Remove from array
      saveTasks(); // Update localStorage
      renderTasks(); // Re-render list
    });
  });
}

// <<<<<<<<<<<<<<< Add new task >>>>>>>>>>>>>>>>
addTodoBtn.addEventListener("click", () => {
  let task = todoInput.value.trim();
  if (task === "") return;

  tasks.push({ text: task, done: false }); // Store object with done status
  saveTasks(); // Save to localStorage
  renderTasks(); // Update UI
  todoInput.value = "";
});

// <<<<<<<<<<<< Render tasks on page load >>>>>>>>>>>>
renderTasks();
