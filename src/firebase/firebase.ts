import { Dispatch, SetStateAction } from 'react';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
} from 'firebase/database';
import { getStorage, ref as sRef, uploadBytes } from 'firebase/storage';

import { BackendInputTasks } from '@/tasks-wrighting-context';
import { ITasks } from '@/types/main-task';
import { ImageUploadObjact } from '@/user-context';

const firebaseConfig = {
  apiKey: 'AIzaSyAfrgtmBXh4cUUH3FBqR5deMUd0MMbM2bU',
  authDomain: 'crm-proj-2103c.firebaseapp.com',
  databaseURL: 'https://crm-proj-2103c-default-rtdb.firebaseio.com',
  projectId: 'crm-proj-2103c',
  storageBucket: 'crm-proj-2103c.appspot.com',
  messagingSenderId: '544758291066',
  appId: '1:544758291066:web:8c001739e52009d35cf9c3',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const getUserData = (usr: User | null) => {
  const uid = usr?.uid;

  const dbRef = ref(database);

  return get(child(dbRef, 'users/' + uid));
};

export const writeUserTask = async (
  data: BackendInputTasks,
  user: ImageUploadObjact,
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
  setTaskData: Dispatch<SetStateAction<ITasks | null>>
) => {
  const newPostKey = push(child(ref(database), 'posts')).key;

  const updates = {} as { [x: string]: BackendInputTasks };

  data.belongsTo = user.uid;
  data.avatar = './assets/avatar.jpg';

  updates['/tasks/' + newPostKey] = data;

  set(ref(database, 'users/' + user.uid), {
    ...user,
    tasksId:
      user.tasksId[0] === '' ? [newPostKey] : [...user.tasksId, newPostKey],
  });
  setUserData({
    ...user,
    tasksId:
      user.tasksId[0] === ''
        ? [newPostKey as string]
        : [...user.tasksId, newPostKey as string],
  });

  update(ref(database), updates);

  getTaskData().then(backData => setTaskData(backData.val()));
};

export const writeUserData = (
  name: string,
  lastName: string,
  email: string,
  uid: string,
  tasksId: string[],
  avatar: string
) => {
  set(ref(database, 'users/' + uid), {
    name,
    ['Last Name']: lastName,
    email,
    uid,
    tasksId: tasksId[0] ? tasksId : [''],
    avatar,
  });
};

export const getTaskData = () => {
  const dbRef = ref(database);

  return get(child(dbRef, 'tasks/'));
};

export const getUserTask = async (id: string) => {
  const dbRef = ref(getDatabase());
  let editedRow = await get(child(dbRef, 'users/' + id));
  editedRow = editedRow.val();
  return editedRow;
};

export const editTasksData = async (
  title: any,
  description: any,
  id: string
) => {
  const dbRef = ref(getDatabase());
  const db = getDatabase();

  let editedRow = await get(child(dbRef, 'users/' + id));
  editedRow = editedRow.val();

  set(ref(db, `users/${id}`), {
    ...editedRow,
    title,
    description,
  });
};
