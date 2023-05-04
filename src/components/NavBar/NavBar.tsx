import Link from 'next/link';
import styles from './NavBar.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { memo } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Info } from 'react-feather';
import { useSocket, useEmojiId, useGameActions } from '@/stores/gameState';
import { useSocketEventListener } from '@/utils/hooks';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

function NavBar() {
  const { data: session } = useSession();
  const { updateUser } = useGameActions();

  useEffect(() => {
    if (session && session.user.name) {
      updateUser({ name: session.user.name, auth: true });
    } else {
      let localUser = localStorage.getItem('session');
      if (!localUser) {
        const userstring = `Guest ${String(Math.floor(Math.random() * 1000))}`;
        localStorage.setItem('session', userstring);
        updateUser({ name: userstring, auth: false });
      } else {
        updateUser({ name: localUser, auth: false });
      }
    }
  }, [session, updateUser]);

  const emojiId = useEmojiId();
  const router = useRouter();
  const socket = useSocket();
  const { leaveGame, displayModal } = useGameActions();
  const page = router.pathname;

  useSocketEventListener(socket);

  function showModal(type: 'rules' | 'join') {
    if (router.pathname !== '/') router.push('/');
    if (socket) {
      socket.close();
      leaveGame();
    } else {
      displayModal(type);
    }
  }

  function handleLogout() {
    signOut();
  }

  return (
    <div className={styles.navLayout}>
      <nav className={styles.wrapper}>
        <ul className={`${styles.links} `}>
          <div className={styles.info}>
            <Link href="/">
              <p className={page === '/' ? styles.chosen : styles.link}>Game</p>
            </Link>
            <div className={styles.infoIcon}>
              <Info onClick={() => showModal('rules')} size={'14px'} />
            </div>
          </div>

          <Link href="/stats">
            <p className={page === '/stats' ? styles.chosen : styles.link}>
              Stats{' '}
            </p>
          </Link>

          {session ? (
            <Link href="#" onClick={handleLogout}>
              <p className={styles.link}>Logout</p>
            </Link>
          ) : (
            <Link href="#" onClick={() => signIn()}>
              <p className={styles.link}>Login</p>
            </Link>
          )}
          <Link href="/" onClick={() => showModal('join')}>
            {socket && emojiId ? (
              <p>{emojiId.join('')}</p>
            ) : (
              <p className={styles.Multiplayer}>Multiplayer</p>
            )}
          </Link>
          <ThemeToggle />
        </ul>
      </nav>
    </div>
  );
}

export default memo(NavBar);
