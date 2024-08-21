import React, { useEffect, useState } from "react";
import config from "@/utils/UserConfig";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
                    <Switch id="SpotiState" defaultChecked={config.get.spotify().enabled === "true"}
                        onCheckedChange={(value) => config.set.spotify.enabled(value)} />
                    <label
                        htmlFor="SpotiState"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Display currently playing song
                    </label>
                </div>
                <h1 className='text-lg -ml-2 font-medium mb-2'>Config</h1>
                <div>
                    <Input type="text" label="Client ID" placeholder="Enter Client ID" value={clientId}
                        onChange={(e) => {
                            setClientId(e.target.value)
                            config.set.spotify.clientID(e.target.value)
                        }} />
                    <p className='text-xs text-neutral-500 select-none mt-1'>
                        Go <a className='underline cursor-pointer' href='https://developer.spotify.com/dashboard'
                            target='_blank' rel="noreferrer">here</a> to get your client id
                    </p>
                </div>
                <div>
                    <Input type="password" label="Client Secret" placeholder="Enter Client Secret" value={clientSecret}
                        onChange={(e) => {
                            setClientSecret(e.target.value)
                            config.set.spotify.clientSecret(e.target.value)
                        }} />
                    <p className='text-xs text-neutral-500 select-none mt-1'>
                        Go <a className='underline cursor-pointer' href='https://developer.spotify.com/dashboard'
                            target='_blank' rel="noreferrer">here</a> to get your client secret
                    </p>
                </div>
                <div>
                    <Input type="text" label="Redirect URL" value={redirectUrl} placeholder="Enter Redirect URL"
                        onChange={(e) => {
                            setRedirectUrl(e.target.value)
                            config.set.spotify.redirectUrl(e.target.value)
                        }} />
                </div>
                <Button className='mt-2' disabled={!clientId || !clientSecret || !redirectUrl || checking}
                    onClick={() => {
                        startCheck();
                        window.open(`https://accounts.spotify.com/authorize?client_id=${config.get.spotify().clientID}&response_type=code&redirect_uri=${config.get.spotify().redirectUrl}&scope=user-read-playback-state%20user-read-currently-playing`, "_blank")
                    }}>
                    {checking ?
                        <><Loader2 className="animate-spin mr-2" /> Authorizing...</> :
                        <><img className='w-[24px] dark:invert mr-1' alt="Spotify Logo"
                            src="/Spotify_Primary_Logo_RGB_White.png" /> Login with Spotify</>
                    }
                </Button>
            </div>
        </div>
    )
}

export {
    SpotifySettings
}