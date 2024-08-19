import React from "react";
import config from '@/utils/UserConfig';
import SpotifyPlayer from "@/components/SpotifyPlayer.jsx";
import Clock from "@/components/Clock.jsx";
import Settings from "@/components/Settings";
import { SearchBar } from "@/components/SearchBar";

function Home() {
    return (
        <main className="w-full h-full flex justify-center items-center max-lg:px-4">
            {config.get.clock().enabled === 'true' ? <Clock /> : null}
            <SearchBar />
            <Settings />
            {config.get.spotify().enabled === "true" ? <SpotifyPlayer /> : null}
        </main>
    );
}

export default Home;
