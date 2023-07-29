import { FC } from 'react';

import { IContactData } from '@/types/contact-type';

import styles from './styles.module.scss';

type ContactItemProps = {
  onChange: () => void;
  userContact: IContactData;
};
const ContactItem: FC<ContactItemProps> = ({ onChange, userContact }) => {
  return (
    <>
      <div className={styles.contacts_header} key={Math.random()}>
        <div>
          <input
            className=" cursor-pointer text-[#109CF1] "
            type="checkbox"
            checked={userContact.isDone}
            onChange={onChange}
            name={userContact.Name}
          />
        </div>
        <div className={styles.contact_name}>{userContact.Name}</div>
        <div>{userContact.Email}</div>
        <div>{userContact['Company name']}</div>
        <div>{userContact.Role}</div>
        <div>{userContact.Forecast}</div>
        <div>{userContact['Due date']}</div>
      </div>
      <hr />
    </>
  );
};

export default ContactItem;
