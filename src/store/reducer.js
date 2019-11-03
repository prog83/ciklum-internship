import { putTasksToStorage, putTaskToStorage, deleteTaskToStorage } from '../storage';

const initialState = {
  filterTitle: '',
  filterStatus: 'all',
  filterPriority: 'all',
  tasks: []
};

// CONSTANTS
const Constants = {
  LOAD_TASKS_FROM_STORAGE: 'LOAD_TASKS_FROM_STORAGE',
  SET_FILTER_TITLE: 'SET_FILTER_TITLE',
  SET_FILTER_STATUS: 'SET_FILTER_STATUS',
  SET_FILTER_PRIORITY: 'SET_FILTER_PRIORITY',
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

// ACTIONS
export function loadTasksFromStorage(value) {
  return {
    type: Constants.LOAD_TASKS_FROM_STORAGE,
    payload: value
  };
}

export function setFilterTitle(value) {
  return {
    type: Constants.SET_FILTER_TITLE,
    payload: value
  };
}

export function setFilterStatus(value) {
  return {
    type: Constants.SET_FILTER_STATUS,
    payload: value
  };
}

export function setFilterPriority(value) {
  return {
    type: Constants.SET_FILTER_PRIORITY,
    payload: value
  };
}

export function createTask(value) {
  return {
    type: Constants.CREATE_TASK,
    payload: value
  };
}

export function updateTask(value) {
  return {
    type: Constants.UPDATE_TASK,
    payload: value
  };
}

export function deleteTask(value) {
  return {
    type: Constants.DELETE_TASK,
    payload: value
  };
}

function insertItem(array, value) {
  const newArray = [...array];
  newArray.push(value);
  return newArray;
}

function updateItem(array, value) {
  return array.map(item => {
    if (item.id !== value.id) {
      return item;
    }

    return {
      ...item,
      ...value
    };
  });
}

function deleteItem(array, value) {
  return array.filter(item => item.id !== value);
}

// REDUCER
export async function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.LOAD_TASKS_FROM_STORAGE:
      try {
        putTasksToStorage(action.payload);
        return { ...state, tasks: action.payload };
      } catch (error) {
        throw new Error(error);
      }

    case Constants.SET_FILTER_TITLE:
      return { ...state, filterTitle: action.payload };

    case Constants.SET_FILTER_STATUS:
      return { ...state, filterStatus: action.payload };

    case Constants.SET_FILTER_PRIORITY:
      return { ...state, filterPriority: action.payload };

    case Constants.CREATE_TASK:
      await putTaskToStorage(action.payload);
      return { ...state, tasks: insertItem(state.tasks, action.payload) };

    case Constants.UPDATE_TASK:
      await putTaskToStorage(action.payload);
      return { ...state, tasks: updateItem(state.tasks, action.payload) };

    case Constants.DELETE_TASK:
      await deleteTaskToStorage(action.payload);
      return { ...state, tasks: deleteItem(state.tasks, action.payload) };

    default:
      return state;
  }
}
