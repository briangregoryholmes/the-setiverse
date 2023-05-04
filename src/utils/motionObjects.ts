export const enter = {
  x: [1200, 0],
  transition: { duration: 0.5 },
};

// Tilt and enlarge card
export const tilt = {
  x: [0, 0, 0, 0, 0, -1200],
  opacity: 1,
  zIndex: 1000,
  rotate: [0, 0, 10, 0, 0],
  scale: [1, 1.24, 1.24, 1],
  transition: {
    duration: 1.5,
    ease: 'easeInOut',
  },
};

export const shakeMotion = {
  x: [0, 10, -10, 10, -10, 10, -10, 0],
};

export const flipUpsideDown = {
  rotate: [0, 180, 180, 0, 0],
};

export const select = {
  scale: 1,
};

export const spring = {
  type: 'spring',
  stiffness: 400,
  damping: 9,
};

export const bouncySpring = {
  type: 'spring',
  stiffness: 900,
  damping: 40,
  mass: 3,
};

export const heavySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 60,
  mass: 3,
};

export const appear = {
  scale: [0.9, 1.3, 1],
  transition: heavySpring,
};
