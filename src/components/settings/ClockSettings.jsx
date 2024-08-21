import { Switch } from "@/components/ui/switch.jsx";
import config from "@/utils/UserConfig.js";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.jsx";
import React from "react";

const ClockSettings = () => {
    return (
        <div className='p-4'>
            <h1 className='text-lg font-medium'>Clock</h1>
            <div className='pl-2 py-2 flex flex-col gap-2'>
                <div className="flex items-center space-x-2">
                    <Switch id="ClockState" defaultChecked={config.get.clock().enabled === "true"}
                        onCheckedChange={(value) => config.set.clock.enabled(value)} />
                    <label
                        htmlFor="ClockState"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Display clock
                    </label>
                </div>
                <div>
                    <h1 className='text-lg -ml-2 font-medium mb-2'>Clock Format</h1>
                    <ToggleGroup type="single" disabled variant="outline" className="w-fit"
                        defaultChecked={config.get.clock().format}>
                        <ToggleGroupItem value="12h">12h</ToggleGroupItem>
                        <ToggleGroupItem value="24h">24h</ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>
    )
}

export {
    ClockSettings
}


