import uuidv4 from 'uuid/v4';
import './style.scss';

import { openOverlay, addClickListenerOverlay, dispatchClickOverlay } from '../overlay';

import store, { getTaskById } from '../../store';
import { createTask, updateTask } from '../../store/reducer';

const taskForm = document.querySelector('#taskForm');
const buttonCloseTaskForm = document.querySelector('#buttonCloseTaskForm');
const buttonSaveTaskForm = document.querySelector('#buttonSaveTaskForm');
const fieldsTaskForm = taskForm.querySelectorAll('input[type=text], textarea, select');

// Collect field values in an object
function getDataTaskForm() {
  const dataTaskForm = {};
  fieldsTaskForm.forEach(({ name, value = '' }) => {
    dataTaskForm[name] = value;
  });

  return dataTaskForm;
}

function getTempDataFromStorage() {
  const data = localStorage.getItem('tempTask');
  return data ? JSON.parse(data) : {};
}

function saveTempDataToStorage() {
  const data = getDataTaskForm();
  if (!data.id) localStorage.setItem('tempTask', JSON.stringify(data));
}

function clearTempDataFromStorage() {
  localStorage.removeItem('tempTask');
}

export function closeTaskForm() {
  taskForm.classList.remove('active');
}

function handleCloseTaskFormByOverlay({ detail }) {
  // Get user data (is click overlay) from CustomEvent
  const { isTemp = true } = detail || {};
  if (isTemp) saveTempDataToStorage();
  closeTaskForm();
}

// Clear and set for default value
function initializeToCreate() {
  // Check temp data from storage
  const tempData = getTempDataFromStorage();

  fieldsTaskForm.forEach(field => {
    const element = field;

    switch (element.name) {
      case 'status':
        element.value = 'open';
        break;

      case 'priority':
        element.value = 'hight';
        break;

      default:
        element.value = tempData[element.name] || '';
        break;
    }
  });
}

// Fill form
function initializeToEdit(id) {
  const taskItem = getTaskById(id);
  if (taskItem)
    fieldsTaskForm.forEach(field => {
      const element = field;
      element.value = taskItem[field.name] || '';
    });
}

export function openTaskForm(id) {
  if (id) initializeToEdit(id);
  else initializeToCreate();

  taskForm.classList.add('active');

  addClickListenerOverlay(handleCloseTaskFormByOverlay);
  openOverlay('backdrop');

  // Fosuc first to field
  const firstField = taskForm.querySelector('input[type=text]');
  firstField.focus();
}

function handleCloseTaskForm() {
  clearTempDataFromStorage();
  closeTaskForm();
  dispatchClickOverlay({ isTemp: false });
}

function validateForm() {
  let valid = true;

  fieldsTaskForm.forEach(field => {
    const { name, value = '' } = field;
    const label = field.closest('div[class^=textfield]');

    if (['title', 'description'].includes(name) && value === '') {
      valid = false;
      label.classList.add('error');
    } else if (label) label.classList.remove('error');
  });

  return valid;
}

async function handleSaveTask() {
  if (validateForm()) {
    const data = getDataTaskForm();

    // Update
    if (data.id) {
      // await putTaskToStorage(data);
      store.dispatch(updateTask(data));
    } else {
      // Create
      data.id = uuidv4();
      // await putTaskToStorage(data);
      store.dispatch(createTask(data));
    }

    handleCloseTaskForm();
  }
}

buttonCloseTaskForm.addEventListener('click', handleCloseTaskForm);
buttonSaveTaskForm.addEventListener('click', handleSaveTask);
