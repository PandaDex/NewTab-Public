import { AudioLinesIcon, ClockIcon, CloudyIcon, Settings2Icon, SettingsIcon, Loader2, SunIcon, MoonIcon, Users, MonitorIcon, ShieldCheck } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from '@/components/ui/button';
import config from '@/utils/UserConfig';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/theme-provider';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function Settings() {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    return (
        <>
            {settingsModalOpen && <SettingsModal setModalState={setSettingsModalOpen} modalState={settingsModalOpen} />}
            <div className='absolute right-5 bottom-5'>
                <div className='flex gap-1 items-center bg-neutral-925 dark:bg-white px-2.5 py-1 rounded-md text-black dark:text-white !bg-opacity-0 cursor-pointer ease-in-out duration-75 select-none hover:!bg-opacity-20'
                    role='button'
                    onClick={() => setSettingsModalOpen(!settingsModalOpen)}>
                    <SettingsIcon size={20} />
                    <p>Settings</p>
                </div>
            </div>
        </>
    )
}

function SettingsModal({ setModalState = () => { }, modalState = true }) {
    const [currentTab, setCurrentTab] = useState('General');
    const ModalOption = ({ title, children, onClick, iconCss = '' }) => {
        return (
            <div className='flex items-center gap-1.5 py-1 px-1.5 bg-white bg-opacity-0 rounded-md cursor-pointer hover:bg-opacity-10 ease-in-out duration-75 select-none'
                onClick={onClick}
                role='button'>
                <div className={`bg-neutral-700 p-0.5 rounded-md ${iconCss}`}>
                    {children}
                </div>
                <h1>{title}</h1>
            </div>
        )
    }

    const SettingsRouter = ({ tab }) => {
        switch (tab) {
            case 'General':
                return <GeneralSettings />
            case 'Weather':
                return <WeatherSettings />
            case 'Spotify':
                return <SpotifySettings />
            case 'Clock':
                return <ClockSettings />
            default:
                return "General";
        }
    }
    const GeneralSettings = () => {
        const { setTheme } = useTheme();
        return (
            <div className='p-4'>
                <h1 className='text-lg font-medium'>Favorite</h1>
                <div className='pl-2 py-2 flex flex-col gap-2'>
                    <div className="flex items-center space-x-2">
                        <Switch id="FavoriteState" defaultChecked={config.get.general().displayFavorite === "true"} onCheckedChange={(value) => config.set.general.displayFavorite(value)} />
                        <label
                            htmlFor="FavoriteState"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Display favorite sites
                        </label>
                    </div>
                    <h1 className='text-lg -ml-2 font-medium'>Theme</h1>
                    <div>
                        <ToggleGroup type="single" variant="outline" defaultValue={useTheme().theme} onValueChange={(value) => setTheme(value)} className="w-fit">
                            <ToggleGroupItem value="light" className="border-neutral-100">
                                <div className='flex gap-1 items-center'>
                                    <SunIcon />
                                    <p>Light</p>
                                </div>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="dark" className="border-neutral-100">
                                <div className='flex gap-1 items-center'>
                                    <MoonIcon />
                                    <p>Dark</p>
                                </div>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="system" className="border-neutral-100">
                                <div className='flex gap-1 items-center'>
                                    <MonitorIcon /> <p>System</p>
                                </div>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <h1 className='text-lg -ml-2 font-medium'>Backup</h1>
                    <div>
                        <div className='w-fit flex gap-4'>
                            <Button variant="outline" onClick={() => config.export()}>Export settings</Button>
                            <Button variant="outline" onClick={() => config.import()}>Import settings</Button>
                        </div>
                        <p className='text-xs mt-1.5 text-neutral-500'>Settings can be transferred between devices</p>
                    </div>
                    <h1 className='text-lg -ml-2 font-medium'>About</h1>
                    <div className='flex flex-col gap-2'>
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
                                This project is open source you can view source code on <a href="https://github.com/PandaDex/NewTab-Public" className="text-blue-500">GitHub</a> or contribute and help with project.
                            </AlertDescription>
                        </Alert>
                        <div className='w-full flex justify-center gap-2'>
                            <Button variant="outline" onClick={() => location.replace("https://github.com/PandaDex/NewTab-Public")}>GitHub Repository</Button>
                            <Button variant="outline" onClick={() => location.replace("https://github.com/PandaDex/NewTab-Public/issues")}>Feature Request</Button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    const ClockSettings = () => {
        return (
            <div className='p-4'>
                <h1 className='text-lg font-medium'>Clock</h1>
                <div className='pl-2 py-2 flex flex-col gap-2'>
                    <div className="flex items-center space-x-2">
                        <Switch id="ClockState" defaultChecked={config.get.clock().enabled === "true"} onCheckedChange={(value) => config.set.clock.enabled(value)} />
                        <label
                            htmlFor="ClockState"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Display clock
                        </label>
                    </div>
                    <div>
                        <h1 className='text-lg -ml-2 font-medium mb-2'>Clock Format</h1>
                        <ToggleGroup type="single" disabled variant="outline" className="w-fit" defaultChecked={config.get.clock().format}>
                            <ToggleGroupItem value="12h">12h</ToggleGroupItem>
                            <ToggleGroupItem value="24h">24h</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </div>
        )
    }

    const SpotifySettings = () => {
        const [clientId, setClientId] = useState(config.get.spotify().clientID);
        const [clientSecret, setClientSecret] = useState(config.get.spotify().clientSecret);
        const [redirectUrl, setRedirectUrl] = useState(config.get.spotify().redirectUrl);
        const [checking, setChecking] = useState(false);


        const startCheck = () => {
            setChecking(true);
            const intervalSpoti = setInterval(() => {
                if (Number.parseInt(config.get.spotify().accessTokenTime) - Date.now() < 300000) {
                    setChecking(false);
                    window.alert("Spotify authorized!")
                    clearInterval(intervalSpoti);
                }
            }, 1000)
        }


        useEffect(() => {
            if (!config.get.spotify().redirectUrl) {
                setRedirectUrl(window.location.origin + "/callback")
                config.set.spotify.redirectUrl(window.location.origin + "/callback")
            }
        }, [])
        return (
            <div className='p-4'>
                <h1 className='text-lg font-medium'>Spotify</h1>
                <div className='pl-2 py-2 flex flex-col gap-2'>
                    <div className="flex items-center space-x-2">
                        <Switch id="SpotiState" defaultChecked={config.get.spotify().enabled === "true"} onCheckedChange={(value) => config.set.spotify.enabled(value)} />
                        <label
                            htmlFor="SpotiState"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Display currently playing song
                        </label>
                    </div>
                    <h1 className='text-lg -ml-2 font-medium mb-2'>Config</h1>
                    <div>
                        <Input type="text" label="Client ID" placeholder="Enter Client ID" value={clientId} onChange={(e) => {
                            setClientId(e.target.value)
                            config.set.spotify.clientID(e.target.value)
                        }} />
                        <p className='text-xs text-neutral-500 select-none mt-1'>
                            Go <a className='underline cursor-pointer' href='https://developer.spotify.com/dashboard' target='_blank' rel="noreferrer">here</a> to get your client id
                        </p>
                    </div>
                    <div>
                        <Input type="password" label="Client Secret" placeholder="Enter Client Secret" value={clientSecret} onChange={(e) => {
                            setClientSecret(e.target.value)
                            config.set.spotify.clientSecret(e.target.value)
                        }} />
                        <p className='text-xs text-neutral-500 select-none mt-1'>
                            Go <a className='underline cursor-pointer' href='https://developer.spotify.com/dashboard' target='_blank' rel="noreferrer">here</a> to get your client secret
                        </p>
                    </div>
                    <div>
                        <Input type="text" label="Redirect URL" value={redirectUrl} placeholder="Enter Redirect URL" onChange={(e) => {
                            setRedirectUrl(e.target.value)
                            config.set.spotify.redirectUrl(e.target.value)
                        }} />
                    </div>
                    <Button className='mt-2' disabled={!clientId || !clientSecret || !redirectUrl || checking} onClick={() => {
                        startCheck();
                        window.open(`https://accounts.spotify.com/authorize?client_id=${config.get.spotify().clientID}&response_type=code&redirect_uri=${config.get.spotify().redirectUrl}&scope=user-read-playback-state%20user-read-currently-playing`, "_blank")
                    }}>
                        {checking ?
                            <><Loader2 className="animate-spin mr-2" /> Authorizing...</> :
                            <><img className='w-[24px] dark:invert mr-1' alt="Spotify Logo" src="/Spotify_Primary_Logo_RGB_White.png" /> Login with Spotify</>
                        }
                    </Button>
                </div>
            </div>
        )
    }

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


    return (
        <div className='w-full h-full absolute z-10 bg-black backdrop-blur-sm bg-opacity-40 flex justify-center items-center'>
            <div className='p-2 bg-neutral-200 text-black dark:text-white dark:bg-neutral-900 rounded-md flex h-[600px]'>
                <aside className='h-full w-[200px] py-2 flex flex-col gap-1'>
                    <h1 className='text-xl font-semibold mb-2'>Settings</h1>
                    <ModalOption title='General' iconCss=' bg-gradient-to-tr from-stone-800 via-stone-700 to-stone-500 text-white' onClick={() => setCurrentTab('General')}>
                        <Settings2Icon size={28} />
                    </ModalOption>
                    <div className='w-full h-[1px] my-1 bg-neutral-300 dark:bg-neutral-700' />
                    <ModalOption title='Clock' iconCss='bg-gradient-to-tr from-stone-800 via-stone-700 to-stone-500 text-white' onClick={() => setCurrentTab('Clock')}>
                        <ClockIcon size={28} />
                    </ModalOption>
                    <ModalOption title='Spotify' iconCss='bg-gradient-to-tr from-green-600 via-green-500 to-green-200 text-black' onClick={() => setCurrentTab('Spotify')}>
                        <AudioLinesIcon size={28} />
                    </ModalOption>
                    <ModalOption title='Weather' iconCss='bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-200 text-white' onClick={() => setCurrentTab('Weather')}>
                        <CloudyIcon size={28} />
                    </ModalOption>
                    <div className='h-full w-full flex items-center justify-end flex-col'>
                        <Button className="w-[90%] mb-2" variant="destructive" onClick={() => setModalState(!modalState)}>Exit</Button>
                        <p className='text-[10px] text-neutral-600 dark:text-neutral-400'>*For new settings to take effect page need to be refreshed</p>
                    </div>
                </aside>
                <div className='w-[1px] bg-neutral-300 dark:bg-neutral-700 mx-1'>
                </div>
                <div className='h-full w-[400px]'>
                    <SettingsRouter tab={currentTab} />
                </div>
            </div>
        </div>
    )
}

export default Settings