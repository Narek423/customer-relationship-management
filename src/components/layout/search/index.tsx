import { FC } from 'react';

import Image from 'next/image';

import styles from './styles.module.scss';

type SearchProps = {
  color?: 'gray';
  placeholder:
    | 'Search colleague'
    | 'Search for a mail'
    | 'Search for a contact'
    | 'Global search';
  onClick?: () => void;
};
const Search: FC<SearchProps> = ({ placeholder, onClick, color }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <Image
        className={styles.search_img}
        src={'/assets/Vector.svg'}
        alt=""
        width={20}
        height={20}
      />
      <input
        placeholder={placeholder}
        className={`${color === 'gray' ? styles.input_gray : styles.input}`}
      />
    </div>
  );
};

export default Search;
