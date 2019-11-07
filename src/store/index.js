import Store from './store';
import { reducer } from './reducer';

const appStore = new Store(reducer);

appStore.dispatch({ type: 'INIT' });

export function getTaskById(id) {
  const { tasks } = appStore.state;
  let rslt = null;
  tasks.some((item) => {
    if (item.id === id) {
      rslt = { ...item };
      return true;
    }
    return false;
  });
  return rslt;
}

export default appStore;
