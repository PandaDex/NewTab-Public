import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, GlobeIcon } from "lucide-react";
import config from '@/utils/UserConfig';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SavedSite, { SavedSitePlus } from "@/components/SavedSite";
import { Trash2Icon } from "lucide-react";
import SpotifyPlayer from "@/components/SpotifyPlayer.jsx";
import Clock from "@/components/Clock.jsx";
import Settings from "@/components/Settings";

function Home() {
    const [isURL, setIsURL] = useState(false);
    const [searchEngine, setSearchEngine] = useState(
        localStorage.getItem("NT-lastUsedSearchEngine") || "brave",
    );
    const [query, setQuery] = useState("");
    const [savedSites, setSavedSites] = useState(
        JSON.parse(localStorage.getItem("NT-savedSites")) || [],
    );

    const [searchHistory, setSearchHistory] = useState(
        (JSON.parse(localStorage.getItem("NT-searchHistory")) || []).reverse(),
    );

    const handleChange = (event) => {
        const urlRegex =
            /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?/g;
        const value = event.target.value;
        setIsURL(urlRegex.test(value));
        setQuery(value);
    };

    const handleSearchEngineChange = (value) => {
        setSearchEngine(value);
    };

    const SearchFromHistory = (query) => {
        if (isURL) {
            return (location.href = query);
        }

        if (query === "") {
            return;
        }
        localStorage.setItem("NT-lastUsedSearchEngine", searchEngine);

        switch (searchEngine) {
            case "brave":
                location.href = `https://search.brave.com/search?q=${query}`;
                break;
            case "google":
                location.href = `https://www.google.com/search?q=${query}`;
                break;
            case "duckduck":
                location.href = `https://duckduckgo.com/?q=${query}`;
                break;
            default:
                location.href = `https://search.brave.com/search?q=${query}`;
                break;
        }
    }

    const addToSearchHistory = (query) => {
        const searchHistory = localStorage.getItem("NT-searchHistory") || "[]";
        const searchHistoryArray = JSON.parse(searchHistory);
        searchHistoryArray.push(query);

        if (searchHistoryArray.length > 5) {
            searchHistoryArray.shift();
        }
        localStorage.setItem("NT-searchHistory", JSON.stringify(searchHistoryArray));
    }


    const removeFromSearchHistory = (index) => {
        console.log(index)
        const searchHistory = localStorage.getItem("NT-searchHistory") || "[]";
        const searchHistoryArray = JSON.parse(searchHistory);
        searchHistoryArray.splice(index, 1);
        localStorage.setItem("NT-searchHistory", JSON.stringify(searchHistoryArray));
        setSearchHistory(searchHistoryArray);
    }

    const handleSearch = () => {
        if (isURL) {
            return (location.href = query);
        }

        if (query === "") {
            return;
        }
        localStorage.setItem("NT-lastUsedSearchEngine", searchEngine);
        addToSearchHistory(query);

        switch (searchEngine) {
            case "brave":
                location.href = `https://search.brave.com/search?q=${query}`;
                break;
            case "google":
                location.href = `https://www.google.com/search?q=${query}`;
                break;
            case "duckduck":
                location.href = `https://duckduckgo.com/?q=${query}`;
                break;
            default:
                location.href = `https://search.brave.com/search?q=${query}`;
                break;
        }
    };
    return (
        <div className="w-full h-full flex justify-center items-center max-lg:px-4">
            {config.get.clock().enabled === 'true' ? <Clock /> : null}
            <div className="relative inline-block w-2/4 max-lg:w-full">
                <span className="flex max-lg:flex-col max-lg:gap-2 text-black dark:text-white">
                    <Input
                        id="search"
                        type="text"
                        value={query}
                        className="pl-9 shrink-0 peer"
                        placeholder="Search or type a URL"
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    {searchHistory != null ? Object.keys(searchHistory).length > 0 ? (
                        <div className="w-full absolute peer-focus:flex hover:!flex hidden top-11 rounded-md h-fit py-1 px-1 bg-neutral-200 dark:bg-neutral-950 flex-col gap-1">
                            {searchHistory.map(
                                (query, index) => (
                                    <span key={index} className="w-full flex bg-white bg-opacity-0 z-10 hover:bg-opacity-5 rounded-md py-1 px-1 items-center group cursor-pointer" >
                                        <p className="grow" onClick={() =>
                                            SearchFromHistory(query)
                                        }>{query}</p>
                                        <Trash2Icon size={24} onClick={() => removeFromSearchHistory(index)} className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-800 z-50 collapse group-hover:visible dark:hover:text-neutral-500" />
                                    </span>
                                ))}
                        </div>
                    ) : null : null}
                    <Button
                        className="lg:ml-2"
                        variant="outline"
                        onClick={() => handleSearch()}
                    >
                        {isURL ? "Go" : "Search"}
                    </Button>
                </span>
                <span className="absolute top-2 left-2 text-black dark:text-white">
                    {isURL ? (
                        <GlobeIcon className="size-6" />
                    ) : (
                        <SearchIcon className="size-6" />
                    )}
                </span>
                {isURL ? null : (
                    <span className="absolute top-1 right-1">
                        <Select
                            defaultValue={searchEngine}
                            onValueChange={(e) => handleSearchEngineChange(e)}
                        >
                            <SelectTrigger className="h-[32px] text-black dark:text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-neutral-950 text-black dark:text-white">
                                <SelectItem className="dark:bg-white !bg-opacity-0 hover:!bg-opacity-5 cursor-pointer rounded-md ease-in-out duration-100" value="google">
                                    <span className="flex gap-1">
                                        <div className="w-5 h-5 flex justify-center items-center">
                                            <img
                                                src="/google-black.png"
                                                className="dark:invert h-5"
                                                alt="Google"
                                            />
                                        </div>
                                        <p className="max-sm:hidden">Google</p>
                                    </span>
                                </SelectItem>
                                <SelectItem className="dark:bg-white !bg-opacity-0 hover:!bg-opacity-5 cursor-pointer rounded-md ease-in-out duration-100" value="brave">
                                    <span className="flex gap-1">
                                        <div className="w-5 h-5 flex justify-center items-center">
                                            <img
                                                src="/brave-black.png"
                                                className="dark:invert h-5"
                                                alt="Brave"
                                            />
                                        </div>
                                        <p className="max-sm:hidden">Brave Search</p>
                                    </span>
                                </SelectItem>
                                <SelectItem className="dark:bg-white !bg-opacity-0 hover:!bg-opacity-5 cursor-pointer rounded-md ease-in-out duration-100" value="duckduck">
                                    <span className="flex gap-1">
                                        <div className="w-5 h-5 flex justify-center items-center">
                                            <img
                                                src="/duckduck-black.png"
                                                className="dark:invert h-5"
                                                alt="DuckDuckGo"
                                            />
                                        </div>
                                        <p className="max-sm:hidden">DuckDuckGo</p>
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </span>
                )}
                <div className="w-full h-fit flex justify-center max-lg:justify-center items-center pt-5 flex-wrap gap-2">
                    {config.get.general().displayFavorite === "true" ? <>
                        {savedSites
                            ? savedSites.map((site) => (
                                <SavedSite
                                    title={site.title}
                                    url={site.url}
                                    key={site.url}
                                    icon={site.icon}
                                />
                            ))
                            : null}
                        {savedSites ? Object.keys(savedSites).length >= 8 ? null : <SavedSitePlus setSites={(newValue) => setSavedSites(newValue)} /> : null}
                    </> : null}
                </div>
            </div>
            <Settings />
            {config.get.spotify().enabled === "true" ? <SpotifyPlayer /> : null}
        </div>
    );
}

export default Home;
