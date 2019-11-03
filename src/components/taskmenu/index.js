import './style.scss';
import { openOverlay, addClickListenerOverlay, dispatchClickOverlay } from '../overlay';
import { openTaskForm } from '../taskform';

import store, { getTaskById } from '../../store';
import { updateTask, deleteTask } from '../../store/reducer';

const taskMenu = document.querySelector('#taskMenu');
const doneAction = taskMenu.querySelector('li[name=done]');
const editAction = taskMenu.querySelector('li[name=edit]');
const deleteAction = taskMenu.querySelector('li[name=delete]');

function setPositionTaskMenu(targetElement) {
  const { bottom, right } = targetElement.getBoundingClientRect();
  const { pageYOffset, pageXOffset } = window;

  taskMenu.style.top = `${pageYOffset + 5 + bottom}px`;
  taskMenu.style.left = `${pageXOffset - 80 - 8 + right}px`;
}

export function closeMenu() {
  taskMenu.classList.remove('active');
}

export function openMenu({ target }) {
  const id = target.closest('button').value;
  taskMenu.dataset.id = id;

  const { status } = getTaskById(id);
  if (status === 'done') doneAction.classList.add('hidden');
  else doneAction.classList.remove('hidden');

  setPositionTaskMenu(target);
  taskMenu.classList.add('active');

  addClickListenerOverlay(closeMenu);
  openOverlay();
}

function handleDoneTask() {
  const { id } = taskMenu.dataset || {};
  const task = getTaskById(id);
  store.dispatch(updateTask({ ...task, status: 'done' }));

  doneAction.className = 'hidden';
  closeMenu();
  dispatchClickOverlay();
}

function handleEditTask() {
  closeMenu();
  dispatchClickOverlay();

  const { id } = taskMenu.dataset || {};
  openTaskForm(id);
}

function handleDeleteTask() {
  const { id } = taskMenu.dataset || {};
  store.dispatch(deleteTask(id));

  closeMenu();
  dispatchClickOverlay();
}

doneAction.addEventListener('click', handleDoneTask);
editAction.addEventListener('click', handleEditTask);
deleteAction.addEventListener('click', handleDeleteTask);
