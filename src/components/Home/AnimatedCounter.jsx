import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedCounter = ({ value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    reset: true,
    config: { duration: 2000 },
  });

  return (
    <animated.span className="font-bold font-mono md:text-3xl font-base">
      {number.to((val) => Math.floor(val))}
    </animated.span>
  );
};

export default AnimatedCounter;
