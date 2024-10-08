﻿import { useTheme } from "@/components/theme-provider";
import config from "@/utils/UserConfig";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    MonitorIcon,
    MoonIcon,
    ShieldCheck,
    SunIcon,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";

const GeneralSettings = () => {
    const { setTheme } = useTheme();
    return (
        <div className="p-4">
            <div className="pl-2 py-2 flex flex-col gap-2">
                <h1 className="text-lg -ml-2 font-medium">Theme</h1>
                <div>
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        defaultValue={useTheme().theme}
                        onValueChange={(value) => setTheme(value)}
                        className="w-fit"
                    >
                        <ToggleGroupItem
                            value="light"
                            disabled={useTheme().theme === "light"}
                            className="border-neutral-100"
                        >
                            <div className="flex gap-1 items-center">
                                <SunIcon />
                                <p>Light</p>
                            </div>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="dark"
                            disabled={useTheme().theme === "dark"}
                            className="border-neutral-100"
                        >
                            <div className="flex gap-1 items-center">
                                <MoonIcon />
                                <p>Dark</p>
                            </div>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="system"
                            disabled={useTheme().theme === "system"}
                            className="border-neutral-100"
                        >
                            <div className="flex gap-1 items-center">
                                <MonitorIcon /> <p>System</p>
                            </div>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <h1 className="text-lg -ml-2 font-medium">Backup</h1>
                <div>
                    <div className="w-fit flex gap-1">
                        <Button variant="outline" onClick={() => config.export()}>
                            Export settings
                        </Button>
                        <Button variant="outline" onClick={() => config.import()}>
                            Import settings
                        </Button>
                    </div>
                    <p className="text-xs mt-1.5 text-neutral-500">
                        Settings can be transferred between devices using this file
                    </p>
                    <p className="text-xs mt-1.5 text-red-500">
                        This file contain API keys. Do <b>NOT</b> share it with anyone
                    </p>
                </div>
                <h1 className="text-lg -ml-2 font-medium">About</h1>
                <div className="flex flex-col gap-2">
                    <Alert>
                        <ShieldCheck className="h-5" />
                        <AlertTitle>Privacy</AlertTitle>
                        <AlertDescription className="text-xs">
                            None of your data is sent to server. <br />
                            Everything is stored locally in your browser.
                        </AlertDescription>
                    </Alert>
                    <Alert>
                        <Users className="h-5" />
                        <AlertTitle>Open Source</AlertTitle>
                        <AlertDescription className="text-xs">
                            This project is open source you can view source code on{" "}
                            <a
                                href="https://github.com/PandaDex/NewTab-Public"
                                className="text-blue-500"
                            >
                                GitHub
                            </a>{" "}
                            or contribute and help with project.
                        </AlertDescription>
                    </Alert>
                    <div className="w-full flex gap-1">
                        <Button
                            variant="outline"
                            onClick={() =>
                                location.replace("https://github.com/PandaDex/NewTab-Public")
                            }
                        >
                            GitHub Repository
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                location.replace(
                                    "https://github.com/PandaDex/NewTab-Public/issues",
                                )
                            }
                        >
                            Feature Request
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { GeneralSettings };
