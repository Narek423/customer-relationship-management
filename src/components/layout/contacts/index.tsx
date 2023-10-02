import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import Button from '@/components/layout/button';
import ContactItem from '@/components/layout/contacts/contactItem';
import ContactModal from '@/components/layout/contacts/contactModal';
import Modal from '@/components/layout/modal';
import { IContactData } from '@/components/types/contact-type';
import { useContactsDataContext } from '@/context/contact-context';
import { useUserContext } from '@/context/user-context';
import { removeContact } from '@/firebase/firebase';
import contactsFilter from '@/utils/contacts-filter';

import styles from './styles.module.scss';
const Contacts: FC = () => {
  const [addContact, setAddContact] = useState<boolean>(false);
  const { contactData, setContactData } = useContactsDataContext();
  const [userContacts, setUserContacts] = useState<IContactData[]>([]);
  const { userData, setUserData } = useUserContext();

  const completed = userContacts.filter(
    userContact => userContact.isDone
  ).length;

  useEffect(() => {
    const contacts = Array.isArray(contactData)
      ? contactData
      : contactsFilter(userData.contactsId, contactData);
    if (contacts.length > 0) {
      setUserContacts(contacts);
    }
  }, [contactData]);

  const onClearCompleted = () => {
    const newList = userContacts.filter(contactItem => !contactItem.isDone);
    setContactData(newList);
    setUserContacts(newList);
  };

  const removeId = userContacts
    .filter(item => item.isDone)
    .map(checkItem => checkItem.uid);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      const selectAll = userContacts.map(userContact => {
        return { ...userContact, isDone: checked };
      });
      setUserContacts(selectAll);
    } else {
      const allChecked = userContacts.map(userContact =>
        userContact.Name === name
          ? { ...userContact, isDone: checked }
          : userContact
      );
      setUserContacts(allChecked);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.add}>
        <p className={styles.company}>
          Company:<span>All</span>
        </p>
        <Button variant={'contained'} onClick={() => setAddContact(true)}>
          Add contact
        </Button>
      </div>
      {addContact && (
        <div className={styles.modal_full_screen}>
          <Modal openModal={addContact} onClose={() => setAddContact(false)}>
            <ContactModal onClose={() => setAddContact(false)} />
          </Modal>
        </div>
      )}
      <div className={styles.title_container}>
        <div className="ml-4">
          <input
            className="cursor-pointer  text-[#109CF1] "
            type="checkbox"
            name="selectAll"
            onChange={onChange}
            checked={
              userContacts.filter(userContact => userContact.isDone !== true)
                .length < 1
            }
          />
        </div>
        <div>
          {completed > 0 ? (
            <div className=" flex h-12 items-center ">
              <div>{completed} selected</div>
              <img
                className="ml-4 cursor-pointer"
                src="/assets/recycle.svg"
                alt="recycle"
                onClick={() => {
                  onClearCompleted();
                  removeContact(removeId, userData, setUserData);
                }}
              />
            </div>
          ) : (
            <div className={styles.contacts_header}>
              <div>Name</div>
              <div>Email</div>
              <div>Company name</div>
              <div>Role</div>
              <div>Forecast</div>
              <div>Recent Activity</div>
            </div>
          )}
        </div>
      </div>

      <div>
        <hr />
        {userContacts.map(userContact => {
          return (
            <div key={Math.random()}>
              <ContactItem userContact={userContact} onChange={onChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Contacts;
