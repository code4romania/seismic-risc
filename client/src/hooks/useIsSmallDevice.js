import { useMemo } from 'react';
import useWindowSize from './useWindowSize';

export const useIsSmallDevice = () => {
  const { width } = useWindowSize();

  return useMemo(() => width < 768, [width]);
};

export default { useIsSmallDevice };
