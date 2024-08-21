import React, { useState } from "react";
import config from "@/utils/UserConfig";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SearchSettings = () => {
    const [braveApiKey, setBraveApiKey] = useState(config.get.search().suggestionsApiKey);
    const [showApiKey, setShowApiKey] = useState(false);
    const [provider, setProvider] = useState(config.get.search().suggestionsProvider);
    return (
        <div className='p-4'>
            <h1 className='text-lg font-medium'>Search</h1>
            <div className='pl-2 py-2 flex flex-col gap-3'>
                <div className="flex items-center space-x-2">
                    <Switch id="FavoriteState" defaultChecked={config.get.search().displayFavorite === "true"}
                        onCheckedChange={(value) => config.set.search.displayFavorite(value)} />
                    <label
                        htmlFor="FavoriteState"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Display favorite sites
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="ClockState" defaultChecked={config.get.search().suggestionsEnabled === "true"}
                        onCheckedChange={(value) => config.set.search.suggestionsEnabled(value)} />
                    <label
                        htmlFor="ClockState"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Display search suggestions
                    </label>
                </div>
                <div>
                    <h1 className='text-lg -ml-2 font-medium mb-2'>Suggestions Provider</h1>
                    <Select defaultValue={provider} onValueChange={(value) => {
                        setProvider(value);
                        config.set.search.suggestionsProvider(value);
                    }}>
                        <SelectTrigger className="text-black dark:text-white dark:bg-neutral-950 bg-neutral-300">
                            <SelectValue defaultValue="duckduckgo" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-950 text-black bg-neutral-300 dark:text-white">
                            <SelectItem
                                key="duckduckgo"
                                className="dark:bg-white bg-black !bg-opacity-0 hover:!bg-opacity-5 cursor-pointer rounded-md ease-in-out duration-100"
                                value="duckduckgo"
                            >
                                <span className="flex gap-1">
                                    <div className="w-5 h-5 flex justify-center items-center">
                                        <img src="/duckduck-black.png" className="dark:invert h-5" alt="duckduckgo logo" />
                                    </div>
                                    <p className="max-sm:hidden">DuckDuckGo</p>
                                </span>
                            </SelectItem>
                            <SelectItem
                                key="brave"
                                className="dark:bg-white bg-black !bg-opacity-0 hover:!bg-opacity-5 cursor-pointer rounded-md ease-in-out duration-100"
                                value="brave"
                            >
                                <span className="flex gap-1">
                                    <div className="w-5 h-5 flex justify-center items-center">
                                        <img src="/brave-black.png" className="dark:invert h-5" alt="brave logo" />
                                    </div>
                                    <p className="max-sm:hidden">Brave Search</p>
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <h1 className='text-lg -ml-2 mt-2 font-medium mb-2'>Suggestions API Key</h1>
                    <Input type={showApiKey ? "text" : "password"} title={provider !== "brave" ? "Only required when using Brave as suggestions provider" : ""} disabled={provider !== "brave"} label="API key" placeholder="Enter API key" value={braveApiKey}
                        onChange={(e) => {
                            setBraveApiKey(e.target.value);
                            config.set.search.suggestionsApiKey(e.target.value);
                        }} />
                    <span className="flex">
                        <p className='text-xs text-neutral-500 select-none mt-1'>
                            Go <a className='underline cursor-pointer' href='https://api.search.brave.com/app/keys'
                                target='_blank' rel="noreferrer">here</a> to get your API key
                        </p>
                        <div className="grow" />
                        <button type="button" onClick={() => setShowApiKey(!showApiKey)} className="text-xs underline underline-offset-2 text-neutral-500">{showApiKey ? "hide" : "show"} API key</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export {
    SearchSettings
}