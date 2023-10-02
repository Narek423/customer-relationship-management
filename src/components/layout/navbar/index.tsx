import { FC, useState } from 'react';

import { menu } from '@/components/data/navbar-menu';
import Avatar from '@/components/layout/avatar';
import NavbarItem from '@/components/layout/navbar-items';
import LogoutIcons from '@/components/svg-icons/logout-icons';
import SettingIcon from '@/components/svg-icons/setting-icon';
import ToggleSidebar from '@/components/svg-icons/toggle-sidebar-icon';
import { useUserContext } from '@/context/user-context';

import styles from './styles.module.scss';

const Navbar: FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const { userData, userSignOut } = useUserContext();

  return (
    <div>
      {!toggle ? (
        <div className={styles.container}>
          <div className={styles.title}>
            <p>SaaS Kit</p>
          </div>
          <hr />
          <div className={styles.navbar}>
            <div className={styles.avatar}>
              <div>
                <Avatar />
              </div>
              <div>
                <div className={styles.name}>{userData.name}</div>
                <div className={styles.lastname}> {userData['Last Name']}</div>
                <div className={styles.email}>{userData.email}</div>
              </div>
            </div>
            {menu.map((item, index) => {
              return (
                <div key={Math.random() + index}>
                  <NavbarItem item={item} toggle={toggle} />
                </div>
              );
            })}
            <div className={styles.hr}>
              <hr />
            </div>
            <div className={styles.settings}>
              <SettingIcon />
              <p>Settings</p>
            </div>

            <div
              className={styles.toggle}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <ToggleSidebar />
              <p>Toggle sidebar</p>
            </div>
            <div className={styles.hr}>
              <hr />
            </div>
            <div className={styles.logout} onClick={userSignOut}>
              <LogoutIcons />
              <p>Log out</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container_toggle}>
          <div className={styles.title_toggle}>
            <p>SaaS</p>
          </div>
          <hr />
          <div className={styles.avatar_toggle}>
            <Avatar />
          </div>
          {menu.map((item, index) => {
            return (
              <div key={Math.random() + index}>
                {toggle ? (
                  <div
                    className={styles.image_toggle}
                    onClick={() => setToggle(!toggle)}
                  >
                    <item.icon />
                  </div>
                ) : (
                  <div key={Math.random() - index}>
                    <NavbarItem item={item} toggle={toggle} />
                  </div>
                )}
              </div>
            );
          })}

          <div className={styles.hr_toggle}>
            <hr />
          </div>
          <div className={styles.settings_toggle}>
            <SettingIcon />
          </div>
          <div
            className={styles.toggle_toggle}
            onClick={() => setToggle(!toggle)}
          >
            <ToggleSidebar />
          </div>
          <div className={styles.hr}>
            <hr />
          </div>
          <div className={styles.logout_logout} onClick={userSignOut}>
            <LogoutIcons />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
