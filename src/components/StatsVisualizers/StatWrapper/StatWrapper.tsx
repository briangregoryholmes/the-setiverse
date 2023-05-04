import * as React from 'react';
import styles from './StatWrapper.module.css';

function StatWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  if (!children) {
  }
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {children && children}
    </div>
  );
}

export default StatWrapper;
