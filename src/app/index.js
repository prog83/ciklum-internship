import '../style/main.scss';
import { existStorage, getTasksFromStorage } from '../storage';
import '../components/toolbar/Toolbar';
import '../components/listtasks';

import GeneratedDataDB from '../../etc/db.json';

import store from '../store';
import { loadTasksFromStorage } from '../store/reducer';

// Check exist and get tasks from storage, if not exist, then get generate data
(async () => {
  let tasks = [];
  const isExistStorage = await existStorage();

  if (isExistStorage) tasks = await getTasksFromStorage();
  else tasks = GeneratedDataDB;

  store.dispatch(loadTasksFromStorage(tasks));
})();

// Set focus
const filterTitle = document.querySelector('#filterTitle');
filterTitle.focus();
