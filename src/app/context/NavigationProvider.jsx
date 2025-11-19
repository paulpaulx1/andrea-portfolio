"use client";

import { createContext, useContext, useState, useEffect } from "react";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [films, setFilms] = useState([]);
  const [worksGroups, setWorksGroups] = useState({});
  const [avocetArtists, setAvocetArtists] = useState([]);

  const [open, setOpen] = useState({
    films: false,
    works: false,
    avocet: false,
  });

  // One-time metadata fetch
  useEffect(() => {
    async function load() {
      try {
        const [filmsRes, worksRes, avocetRes] = await Promise.all([
          fetch("/api/films").then((r) => r.json()),
          fetch("/api/works-on-paper/groups").then((r) => r.json()),
          fetch("/api/avocet-portfolio/artists").then((r) => r.json()),
        ]);

        setFilms(filmsRes.films || []);
        setWorksGroups(worksRes.byYear || {});
        setAvocetArtists(avocetRes.artists || []);
        setLoaded(true);
      } catch (e) {
        console.error("Failed to load nav metadata:", e);
      }
    }
    load();
  }, []);

  function toggle(section) {
    setOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  const value = {
    loaded,
    films,
    worksGroups,
    avocetArtists,
    open,
    toggle,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error("useNavigation must be used inside NavigationProvider");
  return ctx;
}
