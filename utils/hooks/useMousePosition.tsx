import { useInView } from "framer-motion";
import { useState, useEffect } from "react";

////This can be a performance heavy only use while target is in view

interface Props {
  inView?: boolean;
}

const useMousePosition = (ref: React.RefObject<HTMLDivElement>) => {
  const inView = useInView(ref);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // console.log({ x: e.clientX, y: e.clientY });
    };
    inView && window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [inView]);

  return mousePosition;
};

export default useMousePosition;
