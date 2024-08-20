import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SavedSite, { SavedSitePlus } from "@/components/SavedSite";
import { Clock1Icon, SparklesIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchIcon, GlobeIcon } from "lucide-react";
import config from "@/utils/UserConfig";

export function SearchBar() {
  const [isURL, setIsURL] = useState(false);
  const [searchEngine, setSearchEngine] = useState(
    () => localStorage.getItem("NT-lastUsedSearchEngine") || "brave",
  );
  const [query, setQuery] = useState("");
  const [savedSites, setSavedSites] = useState(
    () => JSON.parse(localStorage.getItem("NT-savedSites")) || [],
  );
  const [searchHistory, setSearchHistory] = useState(() =>
    (JSON.parse(localStorage.getItem("NT-searchHistory")) || []).reverse(),
  );
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    localStorage.setItem("NT-lastUsedSearchEngine", searchEngine);
  }, [searchEngine]);

  const handleSearchBarChange = (event) => {
    const urlRegex =
      /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?/g;
    const value = event.target.value;
    setIsURL(urlRegex.test(value));
    setQuery(value);

    if (config.get.searchSuggestions().enabled === "true")
      getSuggestions(event.target.value);
  };

  const getSuggestions = (query) => {
    if (!query) return setSuggestions([]);
    if (query === " ") return setSuggestions([]);
    if (config.get.searchSuggestions().provider === "brave" && config.get.searchSuggestions().apiKey === "") return setSuggestions([]);
    fetch(`https://new-tab-api.vercel.app/suggest?query=${query}&provider=${config.get.searchSuggestions().provider}${config.get.searchSuggestions().provider === "brave" ? `&apikey=${config.get.searchSuggestions().apiKey}` : ""}`)
      .then((response) => response.json())
      .then((data) => setSuggestions(data?.suggestions || []))
      .catch((err) => console.log(err));
  };

  const handleSearch = () => {
    if (!query) return;

    if (isURL) {
      location.href = query;
    } else {
      addToSearchHistory(query);
      searchWithEngine(query);
    }
  };

  const searchWithEngine = (query) => {
    const searchURLs = {
      brave: `https://search.brave.com/search?q=${query}`,
      google: `https://www.google.com/search?q=${query}`,
      duckduck: `https://duckduckgo.com/?q=${query}`,
    };
    location.href = searchURLs[searchEngine] || searchURLs.brave;
  };

  const addToSearchHistory = (query) => {
    const updatedHistory = [...searchHistory.reverse(), query];
    if (updatedHistory.length > 5) {
      updatedHistory.shift();
    }
    const newHistory = updatedHistory.reverse();
    setSearchHistory(newHistory);
    localStorage.setItem("NT-searchHistory", JSON.stringify(newHistory));
  };

  const removeFromSearchHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem("NT-searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="relative inline-block w-2/4 max-lg:w-full">
      <span className="flex max-lg:flex-col max-lg:gap-2 text-black dark:text-white">
        <Input
          id="search"
          type="text"
          value={query}
          className="pl-9 shrink-0 peer"
          placeholder="Search or type a URL"
          onChange={handleSearchBarChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="w-full absolute peer-focus:flex hover:!flex hidden empty:!hidden top-12 rounded-md h-fit py-1 px-1 bg-neutral-200 dark:bg-neutral-950 flex-col gap-1">
          {suggestions.length > 0 &&
            suggestions.map((suggestion, index) => (
              <span
                key={index}
                className="w-full gap-1 flex bg-white bg-opacity-0 z-10 hover:bg-opacity-5 rounded-md py-1 px-1 items-center group cursor-pointer"
              >
                <SparklesIcon size={19} />
                <p
                  className="grow"
                  onClick={() => { addToSearchHistory(suggestion.phrase); searchWithEngine(suggestion.phrase); }}
                >
                  {suggestion.phrase}
                </p>
              </span>
            ))}
          {searchHistory.length > 0 &&
            searchHistory.reverse().map((query, index) => (
              <span
                key={index}
                className="w-full flex gap-1 bg-white bg-opacity-0 z-10 hover:bg-opacity-5 rounded-md py-1 px-1 items-center group cursor-pointer"
              >
                <Clock1Icon size={19} />
                <p className="grow" onClick={() => searchWithEngine(query)}>
                  {query}
                </p>
                <Trash2Icon
                  size={24}
                  onClick={() => removeFromSearchHistory(index)}
                  className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-800 z-50 collapse group-hover:visible dark:hover:text-neutral-500"
                />
              </span>
            ))}
        </div>
        <Button className="lg:ml-2" variant="outline" onClick={handleSearch}>
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
      {!isURL && (
        <span className="absolute top-1 right-1">
          <Select defaultValue={searchEngine} onValueChange={setSearchEngine}>
            <SelectTrigger className="h-[32px] text-black dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-950 text-black dark:text-white">
              {[
                { value: "google", label: "Google", icon: "/google-black.png" },
                {
                  value: "brave",
                  label: "Brave Search",
                  icon: "/brave-black.png",
                },
                {
                  value: "duckduck",
                  label: "DuckDuckGo",
                  icon: "/duckduck-black.png",
                },
              ].map(({ value, label, icon }) => (
                <SelectItem
                  key={value}
                  className="dark:bg-white !bg-opacity-0 hover:!bg-opacity-5 cursor-pointer rounded-md ease-in-out duration-100"
                  value={value}
                >
                  <span className="flex gap-1">
                    <div className="w-5 h-5 flex justify-center items-center">
                      <img src={icon} className="dark:invert h-5" alt={label} />
                    </div>
                    <p className="max-sm:hidden">{label}</p>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
      )}
      <div className="w-full h-fit flex justify-center max-lg:justify-center items-center pt-5 flex-wrap gap-2">
        {config.get.general().displayFavorite === "true" &&
          savedSites.map((site) => (
            <SavedSite
              key={site.url}
              title={site.title}
              url={site.url}
              icon={site.icon}
            />
          ))}
        {savedSites.length < 8 && <SavedSitePlus setSites={setSavedSites} />}
      </div>
    </div>
  );
}
