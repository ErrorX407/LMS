import React, { useRef, useEffect } from 'react';
import locomotiveScroll from 'locomotive-scroll';

const SmoothScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new locomotiveScroll({
      el: scrollRef.current,
      smooth: true, // Enable smooth scrolling
      // Add any other options you need here
    });

    // Clean up the scroll instance when the component unmounts
    return () => {
      scroll.destroy();
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
};

export default SmoothScrollContainer;
