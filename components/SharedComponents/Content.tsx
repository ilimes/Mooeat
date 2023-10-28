import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRef } from 'react';

const Content = ({children}: {children: React.ReactNode}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { ref, visible } = useIntersectionObserver(targetRef);
    return (
        <>
            <div ref={ref} className={visible ? 'fade' : 'default'}>
                {children}
            </div>
        </>
    )
}

export default Content;