'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LocalePathContext = createContext({ alternatePathnames: {} });

export function LocalePathProvider({ children }) {
  const [alternatePathnames, setAlternatePathnames] = useState({});

  const value = useMemo(
    () => ({ alternatePathnames, setAlternatePathnames }),
    [alternatePathnames]
  );

  return <LocalePathContext.Provider value={value}>{children}</LocalePathContext.Provider>;
}

export function LocalePathRegistration({ pathnames }) {
  const { setAlternatePathnames } = useContext(LocalePathContext);

  useEffect(() => {
    setAlternatePathnames?.(pathnames);
    return () => setAlternatePathnames?.({});
  }, [pathnames, setAlternatePathnames]);

  return null;
}

export function useAlternatePathnames() {
  return useContext(LocalePathContext).alternatePathnames;
}
