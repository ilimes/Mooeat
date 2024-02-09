import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver2';

const Content = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { ref, visible } = useIntersectionObserver(targetRef);

  useEffect(() => {
    if (visible && !isVisible) {
      setIsVisible(true);
    }
  }, [visible]);

  return (
    <div ref={ref} className={isVisible ? 'fade' : 'default'}>
      {children}
    </div>
  );
};

export default Content;
