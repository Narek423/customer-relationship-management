import { Dispatch, SetStateAction } from 'react';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage } from 'firebase/storage';

import dataRequest from '../utils/rest';
import { BackendContactInputContact } from '@/contact-wrighting-context/intex';
import { BackendInputTasks } from '@/tasks-wrighting-context';
import { IContact, IContactData } from '@/types/contact-type';
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

export const writeUserContact = async (
  data: BackendContactInputContact,
  user: ImageUploadObjact,
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
  setContactData: Dispatch<SetStateAction<IContact | null>>
) => {
  data.belongsContactTo = user.uid;
  data.avatar = './assets/avatar.jpg';
  const newContactKey = (await createContact(data)).name;
  set(ref(database, 'users/' + user.uid), {
    ...user,
    contactsId:
      user.contactsId[0] === ''
        ? [newContactKey]
        : [...user.contactsId, newContactKey],
  });

  setUserData({
    ...user,
    contactsId:
      user.contactsId[0] === ''
        ? [newContactKey as string]
        : [...user.contactsId, newContactKey as string],
  });

  dataRequest('/contacts').then(backData => {
    setContactData({ ...(backData as IContact) });
  });
};
export const writeUserTask = async (
  data: BackendInputTasks,
  user: ImageUploadObjact,
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
  setTaskData: Dispatch<SetStateAction<ITasks | null>>
) => {
  data.belongsTo = user.uid;
  data.avatar = './assets/avatar.jpg';
  const newPostKey = (await createTask(data)).name;

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

  dataRequest('/tasks').then(backData => {
    setTaskData({ ...(backData as ITasks) });
  });
};

export const writeUserData = (
  name: string,
  lastName: string,
  email: string,
  uid: string,
  tasksId: string[],
  contactsId: string[],
  avatar: string
) => {
  set(ref(database, 'users/' + uid), {
    name,
    ['Last Name']: lastName,
    email,
    uid,
    tasksId: tasksId[0] ? tasksId : [''],
    contactsId: contactsId[0] ? contactsId : [''],
    avatar,
  });
};

export const getAllTasks = async () => {
  const response = await dataRequest<{
    [x: string]: ITasks;
  }>('/tasks');

  return response;
};

export const createTask = async (task: BackendInputTasks) => {
  const response = await dataRequest<{ name: string }>('/tasks', {
    method: 'POST',
    data: task,
  });

  return response;
};

export const createContact = async (contact: BackendContactInputContact) => {
  const response = await dataRequest<{ name: string }>('/contacts', {
    method: 'POST',
    data: contact,
  });
  return response;
};

export const updateTask = async (id: string, task: ITasks) => {
  const response = await dataRequest<{ name: string }>(`/tasks/${id}`, {
    method: 'PUT',
    data: task,
  });

  return response;
};

export const removeTask = async (
  id: string,
  setTaskData: Dispatch<SetStateAction<ITasks>>
) => {
  await dataRequest<null>(`/tasks/${id}`, {
    method: 'DELETE',
  });

  dataRequest('/tasks').then(backData =>
    setTaskData({ ...(backData as ITasks) })
  );
  return { message: `Task with id ${id} removed!` };
};

export const removeContact = async (id: string[]) => {
  for (const key of id) {
    const response = await dataRequest<IContact>(`/contacts/${key}`, {
      method: 'DELETE',
    });
    return response;
  }
  return { message: `Contact with id ${id} removed!` };
};

export const getTaskById = async (id: string) => {
  const response = await dataRequest<ITasks>(`/tasks/${id}`);
  return response;
};
