import styles from './Button.module.css';
import { Actor, Bakbak_One } from 'next/font/google';
import { motion } from 'framer-motion';
const font = Bakbak_One({
  weight: '400',
  preload: false,
});

interface IButtonProps {
  unanimous?: number;
  enabled: boolean;
  text: string;
  color: 'primary' | 'secondary' | 'tertiary';
  func: () => void;
}

const defaultProps: IButtonProps = {
  enabled: true,
  text: 'Button',
  color: 'primary',
  func: () => {},
};

export default function Button(props: IButtonProps) {
  const { enabled, text, func, unanimous } = props;
  return (
    <motion.button
      disabled={!enabled}
      onClick={func}
      className={`${styles.button} ${styles[props.color]}`}
    >
      <p className={font.className}>{text}</p>
      {unanimous ? (
        <div
          style={{ width: `${unanimous * 100}%` }}
          className={styles.progress}
        ></div>
      ) : null}
    </motion.button>
  );
}

Button.defaultProps = defaultProps;
