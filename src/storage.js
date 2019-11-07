import Dexie from 'dexie';

const storage = new Dexie('TODOList');
storage.version(1).stores({ tasks: 'id,modify' });

export async function existStorage() {
  try {
    return await Dexie.exists('TODOList');
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTasksFromStorage() {
  try {
    return await storage.tasks.orderBy('modify').toArray();
  } catch (error) {
    throw new Error(error);
  }
}

export async function putTaskToStorage(item) {
  try {
    return await storage.transaction('rw', storage.tasks, () => storage.tasks.put({ ...item, modify: Date.now() }));
  } catch (error) {
    throw new Error(error);
  }
}

export async function putTasksToStorage(items) {
  try {
    return await storage.transaction('rw', storage.tasks, () => storage.tasks.bulkPut(items));
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTaskToStorage(id) {
  try {
    return await storage.transaction('rw', storage.tasks, () => storage.tasks.delete(id));
  } catch (error) {
    throw new Error(error);
  }
}
