import { IContactData } from '@/components/types/contact-type';

const contactsFilter = (
  contactId: string[],
  contacts: IContactData[]
): IContactData[] => {
  const filteredUserContacts = [];
  for (const key in contacts) {
    if (contactId.includes(key)) {
      contacts[key].uid = key;
      const contactWithId = contacts[key];
      filteredUserContacts.push(contactWithId);
    }
  }
  return filteredUserContacts;
};

export default contactsFilter;
