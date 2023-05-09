import { FC, useState } from 'react';

import styles from './styles.module.scss';

type AddCheckItemFormProps = {
  onClose: () => void;
};

const AddCheckItemForm: FC<AddCheckItemFormProps> = ({ onClose }) => {
  const [itemText, setItemText] = useState<string>('');

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={itemText}
        onChange={e => {
          setItemText(e.target.value);
        }}
      />
      <div>
        <button
          className={styles.add}
          onClick={e => {
            e.preventDefault();
            setItemText('');
            onClose();
          }}
        >
          Add
        </button>
        <button className={styles.cencel} onClick={onClose}>
          Cencel
        </button>
      </div>
    </div>
  );
};

export default AddCheckItemForm;
