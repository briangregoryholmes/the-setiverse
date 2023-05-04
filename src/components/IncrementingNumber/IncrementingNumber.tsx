import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const IncrementingNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ scale: 1.4, opacity: 0.4 }).then(() => {
      setDisplayValue(value);
    });
  }, [value, controls]);

  useEffect(() => {
    controls.start({ scale: 1, opacity: 1 });
  }, [displayValue, controls]);

  return (
    <h1 style={{ lineHeight: `.75rem`, padding: `.5rem`, fontSize: '1rem' }}>
      <motion.span animate={controls}>{displayValue}</motion.span> sets
    </h1>
  );
};

export default IncrementingNumber;
