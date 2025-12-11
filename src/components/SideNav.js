// components/SideNav.jsx (SERVER)
import {
  getNavFilms,
  getNavWorksGroups,
  getNavAvocetArtists,
} from "../lib/data/nav";
import SideNavClient from "./SideNavClient";

export default async function SideNav({ pathname }) {
  const [films, worksGroups, avocetArtists] = await Promise.all([
    getNavFilms(),
    getNavWorksGroups(),
    getNavAvocetArtists(),
  ]);

  return (
    <SideNavClient
      pathname={pathname}
      films={films || []}
      worksGroups={worksGroups || []}
      avocetArtists={avocetArtists || []}
    />
  );
}
