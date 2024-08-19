import React, { useState } from "react";
import config from "@/utils/UserConfig";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const SuggestionSettings = () => {
    const [braveApiKey, setBraveApiKey] = useState(config.get.searchSuggestions().apiKey);
    const [showApiKey, setShowApiKey] = useState(false);
    return (
        <div className='p-4'>
            <h1 className='text-lg font-medium'>Suggestions</h1>
            <div className='pl-2 py-2 flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                    <Switch id="ClockState" defaultChecked={config.get.searchSuggestions().enabled === "true"}
                        onCheckedChange={(value) => config.set.searchSuggestions.enabled(value)} />
                    <label
                        htmlFor="ClockState"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Display search suggestions
                    </label>
                </div>
                {/* <div>
                    <h1 className='text-lg -ml-2 font-medium mb-2'>Config</h1>
                    <Input type={showApiKey ? "text" : "password"} label="API key" placeholder="Enter API key" value={braveApiKey}
                        onChange={(e) => {
                            setBraveApiKey(e.target.value);
                            config.set.searchSuggestions.apiKey(e.target.value);
                        }} />
                    <span className="flex">
                        <p className='text-xs text-neutral-500 select-none mt-1'>
                            Go <a className='underline cursor-pointer' href='https://api.search.brave.com/app/keys'
                                target='_blank' rel="noreferrer">here</a> to get your API key
                        </p>
                        <div className="grow" />
                        <button type="button" onClick={() => setShowApiKey(!showApiKey)} className="text-xs underline underline-offset-2 text-neutral-500">{showApiKey ? "hide" : "show"} API key</button>
                    </span>

                </div> */}
            </div>
        </div>
    )
}

export {
    SuggestionSettings
}