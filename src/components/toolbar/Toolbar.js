import './style.scss';
import store from '../../store';
import { setFilterTitle, setFilterStatus, setFilterPriority } from '../../store/reducer';

import { openTaskForm } from '../taskform';

const filterTitle = document.querySelector('#filterTitle');
const filterStatus = document.querySelector('#filterStatus');

const filterPriority = document.querySelector('#filterPriority');

const buttonCreate = document.querySelector('#buttonCreate');

function handleChangeTitle({ target }) {
  store.dispatch(setFilterTitle(target.value));
}

function handleChangeStatus({ target }) {
  store.dispatch(setFilterStatus(target.value));
}

function handleChangePriority({ target }) {
  store.dispatch(setFilterPriority(target.value));
}

function handleButtonCreate() {
  openTaskForm();
}

filterTitle.addEventListener('keyup', handleChangeTitle);
filterStatus.addEventListener('change', handleChangeStatus);
filterPriority.addEventListener('change', handleChangePriority);
buttonCreate.addEventListener('click', handleButtonCreate);
