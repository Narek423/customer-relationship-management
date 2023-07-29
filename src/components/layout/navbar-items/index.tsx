import { FC, useState } from 'react';

import { Dashboard } from '@mui/icons-material';

import ItemsModal from '@/components/layout/modal/itemsModal';
import styles from '@/components/layout/navbar/styles.module.scss';
import { INavbarMenu } from '@/types/i-navbar-menu';
import { useUserContext } from '@/user-context';

type NavbarItemProps = {
  toggle: boolean;
  item: INavbarMenu;
};
const NavbarItem: FC<NavbarItemProps> = ({ item, toggle }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setContact } = useUserContext();

  return (
    <div>
      <div
        key={item.name}
        className={styles.image}
        onClick={e => {
          setOpenModal(true);
          (item.name === 'Dashboard' && setContact(false)) ||
            (item.name === 'Contacts' && setContact(true));
          e.stopPropagation();
        }}
      >
        <item.icon />
        <p className={styles.item_name}>{item.name}</p>
      </div>
      <div className="ml-[3.8rem] ">
        {openModal && (
          <ItemsModal
            buttonName={item.name}
            toggle={toggle}
            openModal={openModal}
            onClose={() => setOpenModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NavbarItem;
