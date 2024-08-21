import React, { useState } from "react";
import config from "@/utils/UserConfig";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";

const WeatherSettings = () => {
    const [cityid, setCityId] = useState(config.get.weather().cityId);
    const [apiKey, setApiKey] = useState(config.get.weather().apiKey);
    return (
        <div className='p-4'>
            <h1 className='text-lg font-medium'>Weather</h1>
            <div className='pl-2 py-2 flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                    <Switch id="WeatherState" defaultChecked={config.get.weather().enabled === "true"} disabled={config.get.clock().enabled === "false"} onCheckedChange={(value) => config.set.weather.enabled(value)} />
                    <label
                        htmlFor="WeatherState"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Display weather
                    </label>
                </div>
                {config.get.clock().enabled === "false" ? <>
                    <p className='bg-red-500 bg-opacity-20 text-sm rounded-md px-1 py-0.5 w-fit border border-red-500'>
                        Clock need to be enabled to display weather!
                    </p>
                </> : null}
                <div>
                    <h1 className='text-lg -ml-2 font-medium mb-2'>Unit</h1>
                    <ToggleGroup type="single" variant="outline" defaultValue={config.get.weather().unit} className="w-fit" onValueChange={(value) => config.set.weather.unit(value)}>
                        <ToggleGroupItem value="true" className="border-neutral-100">Celsius</ToggleGroupItem>
                        <ToggleGroupItem value="false" className="border-neutral-100">Fahrenheit</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div>
                    <h1 className='text-lg -ml-2 font-medium mb-2'>Config</h1>
                    <Input type="password" label="API Key" placeholder="Enter your API key" value={apiKey} onChange={(e) => {
                        setApiKey(e.target.value);
                        config.set.weather.apiKey(e.target.value);
                    }} />
                    <p className='text-xs text-neutral-500 select-none mt-1'>
                        Go <a className='underline cursor-pointer' href='https://developer.accuweather.com/user/me/apps' target='_blank' rel="noreferrer">here</a> to get your API key
                    </p>
                </div>
                <div>
                    <Input type="number" label="City ID" placeholder="Enter your city id" value={cityid} onChange={(e) => {
                        setCityId(e.target.value);
                        config.set.weather.cityId(e.target.value);
                    }} />
                    <a className='text-xs text-neutral-500 select-none mt-1 underline' href='/how-to-id.png'>How to get id?</a>
                </div>
            </div>
        </div>
    )
}
export {
    WeatherSettings
}