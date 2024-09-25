import { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useBreakpoints = () => {
  const [isPortrait, setIsPortrait] = useState(true);
  const setScreenOrientation = () => {
    const isMatch = window.matchMedia('(orientation: portrait)').matches;
    // if (isMatch !== isPortrait) {
    // prevent frequent re-renders
    setIsPortrait(isMatch);
    // }
  };
  useEffect(() => {
    window.addEventListener('resize', setScreenOrientation);
    window.addEventListener('orientationchange', setScreenOrientation);
    return () => {
      window.removeEventListener('resize', setScreenOrientation);
      window.removeEventListener('orientationchange', setScreenOrientation);
    };
  }, []);
  const isXs = useMediaQuery('(max-width:599px)');
  const downSm = useMediaQuery('(max-width:600px)');
  const upSm = useMediaQuery('(min-width:600px)');
  const isMd = useMediaQuery('(max-width:960px)');
  const isLg = useMediaQuery('(min-width:961px)');
  const isNeedView = useMediaQuery('(max-width:800px)');

  return {
    isXs,
    downSm,
    upSm,
    isMd,
    isLg,
    isNeedView,
    isPortrait,
  };
};

export default useBreakpoints;
