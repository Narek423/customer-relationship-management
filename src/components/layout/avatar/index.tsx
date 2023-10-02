import { ChangeEvent, FC, useEffect, useState } from 'react';

import LoadingAvatar from '@/components/layout/loading-avatar';
import CheckIcon from '@/components/svg-icons/check-icon';
import EditIcon from '@/components/svg-icons/edit-icon';
import { useUserContext } from '@/context/user-context';

import styles from './styles.module.scss';

const Avatar: FC = () => {
  const { userData, onHandleClick } = useUserContext();
  const [url, setUrl] = useState<string>('');
  const [imageUpload, setImageUpload] = useState<Blob | null>(null);
  const [imageConfirm, setImageConfirm] = useState<boolean>(false);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (((e.target as HTMLInputElement)?.files as FileList)[0]) {
      setImageUpload(((e.target as HTMLInputElement)?.files as FileList)[0]);
    }
  };
  useEffect(() => {
    if (userData && userData.avatar) setUrl(userData.avatar);
  }, [userData]);

  const avatarImage = './assets/avatar.jpg';
  return (
    <>
      {!imageUpload ? (
        <div>
          <div className={styles.avatar_container}>
            <img
              src={userData?.avatar || url || avatarImage}
              className={styles.img}
            />
            <div onClick={() => setImageConfirm(!imageConfirm)}>
              <div className={styles.edit}>
                <EditIcon />
              </div>
              <input
                type="file"
                onChange={onHandleChange}
                className={styles.image_name}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.avatar_container}>
          <img src={url || './assets/avatar.jpg'} className={styles.img}></img>
          <div onClick={() => setImageConfirm(!imageConfirm)}>
            <div
              className={styles.edit}
              onClick={() => onHandleClick(imageUpload, setImageUpload, setUrl)}
            >
              <CheckIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
