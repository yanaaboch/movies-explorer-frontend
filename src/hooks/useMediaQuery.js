import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const getMatches = () => {
      if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches;
      }
      return false;
    };

    function handleChange() {
      setMatches(getMatches(query));
    }

    handleChange();

    const matchQueryList = window.matchMedia(query);

    matchQueryList.addEventListener('change', handleChange);

    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
