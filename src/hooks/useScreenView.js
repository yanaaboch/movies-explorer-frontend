import useMediaQuery from './useMediaQuery';
import { MEDIA_QUERIES } from '../utils/scripts/constants';

function useScreenView() {
  const isMobile = useMediaQuery(MEDIA_QUERIES.IS_MOBILE);
  const isTablet = useMediaQuery(MEDIA_QUERIES.IS_TABLET);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.IS_DESKTOP);

  return { isMobile, isTablet, isDesktop };
}

export default useScreenView;
