const listOfTasks = document.querySelector("#listOfTasks");
const addTaskForm = document.querySelector("#addTaskForm");
const tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];

function addNewTask(e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  if (input.value.trim() == "") {
    return;
  }
  tasks.push({ done: false, description: input.value.trim() });
  input.value = "";
  saveToLocalStorage();

  populateList();
  return;
}

function toggleTask(e) {
  console.log(e.target.checked);
  console.log(e.target);
  const index = e.target.dataset.index;
  tasks[index].done = e.target.checked;
  saveToLocalStorage();
}

function deleteTask(e) {
  const ul = e.target.parentElement;
  const input = ul.querySelector("input");
  const index = input.dataset.index;
  tasks.splice(index, 1);
  saveToLocalStorage();
  populateList();
}

function populateList() {
  listOfTasks.innerHTML = tasks
    .map((task, index) => {
      return `
      <li class="w-full flex select-none">
        <label class="w-full p-2 flex items-center gap-1 hover:bg-white/5">
          <input class="hidden peer" type="checkbox" data-index="${index}" ${task.done ? "checked" : ""} />
          <div class="peer-checked:bg-gray-500 w-4 h-4 border rounded-full"></div>
          <span class="peer-checked:line-through peer-checked:text-gray-500">${task.description}</span>
        </label>
        <button class="hover:text-red-200 p-2 hover:bg-red-200/5">
          <div class="pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
        </button>
      </li>
      `;
    })
    .join("");
}

function saveToLocalStorage() {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskForm.addEventListener("submit", addNewTask);

listOfTasks.addEventListener("click", (e) => {
  if (e.target.matches("input")) {
    toggleTask(e);
  }
  if (e.target.matches("button")) {
    deleteTask(e);
  }
});

populateList();
