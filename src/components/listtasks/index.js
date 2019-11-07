import store from '../../store';
import TaskCard from '../taskcard';

const tasksContainer = document.querySelector('#tasksContainer');

function clearTasksContainer() {
  while (tasksContainer.firstChild) {
    tasksContainer.removeChild(tasksContainer.firstChild);
  }
}

function filterByInput(value, filterValue) {
  return value.toLowerCase().includes(filterValue);
}

function filterBySelect(value, filterValue) {
  return value === filterValue || filterValue === 'all';
}

function ListTasks() {
  const {
    tasks, filterTitle = '', filterStatus = 'all', filterPriority = 'all',
  } = store.state;

  // Remove all CardTask
  clearTasksContainer();

  // Refresh with filter
  tasks
    .filter(
      (task) => filterByInput(task.title, filterTitle)
        && filterBySelect(task.status, filterStatus)
        && filterBySelect(task.priority, filterPriority),
    )
    .forEach((element) => {
      tasksContainer.appendChild(TaskCard(element));
    });
}

// ubscribe to updates
store.subscribe(ListTasks);
