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
import { IContact, IContactData } from '@/components/types/contact-type';
import { IEditData } from '@/components/types/edit-data-type';
import { ITaskData, ITasks } from '@/components/types/main-task';
import { BackendContactInputContact } from '@/context/contact-context';
import { BackendInputTasks } from '@/context/tasks-context';
import { ImageUploadObjact } from '@/context/user-context';

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
  setContactData: Dispatch<SetStateAction<IContactData[]>>
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
    setContactData({ ...(backData as IContactData[]) });
  });
};
export const writeUserTask = async (
  data: BackendInputTasks,
  user: ImageUploadObjact,
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>
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

export const updateTask = async (id: string, task: ITaskData) => {
  const response = await dataRequest<{ name: string }>(`/tasks/${id}`, {
    method: 'PUT',
    data: task,
  });

  return response;
};

export const updateTaskData = async (
  id: string,
  updatedCheckItem: IEditData
) => {
  const response = await dataRequest<{ name: string }>(`/tasks/${id}`, {
    method: 'PUT',
    data: updatedCheckItem,
  });

  return response;
};

export const removeTask = async (
  id: string,
  setTaskData: Dispatch<SetStateAction<ITasks>>,
  userData: ImageUploadObjact,
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>
) => {
  await dataRequest<null>(`/tasks/${id}`, {
    method: 'DELETE',
  });

  dataRequest('/tasks').then(backData =>
    setTaskData({ ...(backData as ITasks) })
  );

  const checkedTaskId =
    userData.tasksId.filter(backId => id !== backId).length === 0
      ? ['']
      : userData.tasksId.filter(backId => id !== backId);

  const updatedUserData = {
    ...userData,
    tasksId: checkedTaskId,
  };

  set(ref(database, 'users/' + userData.uid), updatedUserData);
  setUserData(updatedUserData);

  return { message: `Task with id ${id} removed!` };
};

export const removeContact = async (
  id: string[],
  userData: ImageUploadObjact,
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>
) => {
  let checkedContactId = userData.contactsId;

  for (const key of id) {
    await dataRequest<IContact>(`/contacts/${key}`, {
      method: 'DELETE',
    });

    checkedContactId =
      checkedContactId.filter(backId => key !== backId).length === 0
        ? ['']
        : checkedContactId.filter(backId => key !== backId);
  }

  const updatedUserData = {
    ...userData,
    contactsId: checkedContactId,
  };

  set(ref(database, 'users/' + userData.uid), updatedUserData);
  setUserData(updatedUserData);

  return { message: `Contact with id ${id} removed!` };
};

export const getTaskById = async (id: string) => {
  const response = await dataRequest<ITasks>(`/tasks/${id}`);
  return response;
};
