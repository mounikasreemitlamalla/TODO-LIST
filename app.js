const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskPriority = document.getElementById('task-priority');
const taskDueDate = document.getElementById('task-due-date');
const taskList = document.getElementById('task-list');

let tasks = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.dataset.index = index;

    const taskTitleSpan = document.createElement('span');
    taskTitleSpan.className = 'task-title';
    taskTitleSpan.textContent = task.title;

    const taskActions = document.createElement('span');
    taskActions.className = 'task-actions';

    const taskComplete = document.createElement('input');
    taskComplete.type = 'checkbox';
    taskComplete.checked = task.completed;
    taskComplete.addEventListener('change', () => {
      task.completed = taskComplete.checked;
      saveTasks();
    });

    const taskEdit = document.createElement('button');
    taskEdit.className = 'edit-task';
    taskEdit.textContent = 'Edit';
    taskEdit.addEventListener('click', () => {
      const newTitle = prompt('Enter the new task title:');
      if (newTitle) {
        task.title = newTitle;
        saveTasks();
        renderTasks();
      }
    });

    const taskDelete = document.createElement('button');
    taskDelete.className = 'delete-task';
    taskDelete.textContent = 'Delete';
    taskDelete.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskActions.appendChild(taskComplete);
    taskActions.appendChild
