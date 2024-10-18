import React, { useState, useEffect } from 'react';

const useIntersectionObserver = (targetRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const ref = targetRef;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (target === ref.current) {
            setVisible(isIntersecting);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
};

export default useIntersectionObserver;
