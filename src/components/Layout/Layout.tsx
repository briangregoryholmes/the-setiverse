import styles from './Layout.module.css';
import { Toaster } from 'react-hot-toast';
import { ScoreWrapper } from '@/components/index';
import NavBar from '@/components/NavBar/NavBar';
import { memo } from 'react';
import Modal from '../Modal/Modal';
import { Josefin_Sans } from 'next/font/google';

type LayoutProps = {
  children: React.ReactNode;
};

const font = Josefin_Sans({
  weight: '700',
  preload: true,
  subsets: ['latin-ext'],
  variable: '--josefin',
});

function Layout({ children }: LayoutProps) {
  return (
    <div className={`${font.className} ${styles.layout}`}>
      <Toaster />
      <NavBar />
      <Modal />
      <ScoreWrapper />
      <main className={styles.section}>{children}</main>
    </div>
  );
}

export default memo(Layout);
