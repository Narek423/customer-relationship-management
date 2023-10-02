import { FC, useState } from 'react';

import { contactInputData } from 'src/components/data/contact-Input-Data';

import InputContact from '@/components/layout/contacts/input-contact';
import { useContactsDataContext } from '@/context/contact-context';
import { BackendContactInputContact } from '@/context/contact-context';
import { useUserContext } from '@/context/user-context';

import styles from './styles.module.scss';

type ContactModalProps = {
  onClose: () => void;
};
const ContactModal: FC<ContactModalProps> = ({ onClose }) => {
  const [err, setErr] = useState<string>('');
  const { writeNewContact, setContactData } = useContactsDataContext();
  const { userData, setUserData } = useUserContext();

  const handleSubmitContact = async (
    backendContactInputData: BackendContactInputContact
  ) => {
    try {
      writeNewContact(
        backendContactInputData,
        userData,
        setUserData,
        setContactData
      );
      onClose();
    } catch (error) {
      setErr('Invalid input! Please enter valid information.');
      alert(err);
    }
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <div className={styles.title}>Add contact</div>
        <img
          onClick={onClose}
          className={styles.icon_X}
          src="assets/xIcon.png"
        />
      </div>

      <div className={styles.inputs_container}>
        {contactInputData.map((input, index) => {
          return (
            <div key={Math.random()} className={styles.inputs}>
              <InputContact
                input={input}
                inputsData={contactInputData}
                index={index}
                handleSubmitContact={handleSubmitContact}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactModal;
