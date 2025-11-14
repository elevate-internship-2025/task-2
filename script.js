// Elements
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const count = document.getElementById('count');
const clearCompletedBtn = document.getElementById('clearCompleted');

let tasks = []; 

// Helpers
function updateCount() {
  const total = list.children.length;
  count.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
}

function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task-item';

  // Check complete toggle
  const check = document.createElement('button');
  check.className = 'icon-btn check';
  check.setAttribute('aria-label', 'Mark task complete');
  check.innerHTML = '✓';

  // Text
  const span = document.createElement('div');
  span.className = 'task-text';
  span.textContent = text;

  // Actions wrapper
  const actions = document.createElement('div');
  actions.className = 'task-actions';

  // remove
  const trash = document.createElement('button');
  trash.className = 'icon-btn trash';
  trash.setAttribute('aria-label','Remove task');
  trash.textContent = '🗑'; 

  // Events
  check.addEventListener('click', () => {
    li.classList.toggle('completed');
    check.classList.toggle('checked');
  });

  trash.addEventListener('click', () => {
    li.remove();
    updateCount();
  });

  // Make enter on text toggle complete as well 
  span.addEventListener('dblclick', () => {
    li.classList.toggle('completed');
    check.classList.toggle('checked');
  });

  actions.appendChild(check);
  actions.appendChild(trash);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

// Add task function
function addTaskFromInput() {
  const text = input.value.trim();
  if (!text) {
    // small feedback - shake input (quick)
    input.animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 200 });
    return;
  }
  const taskEl = createTaskElement(text);
  list.prepend(taskEl); // newest on top
  input.value = '';
  input.focus();
  updateCount();
}

// Events
addBtn.addEventListener('click', addTaskFromInput);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskFromInput();
});

clearCompletedBtn.addEventListener('click', () => {
  const completed = list.querySelectorAll('.completed');
  completed.forEach(el => el.remove());
  updateCount();
});

updateCount();
