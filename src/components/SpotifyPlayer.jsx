import config from '@/utils/UserConfig';
import React, { useEffect, useState } from 'react';
const IntervalTime = 2000;
function SpotifyPlayer() {
    const [trackData, setTrackData] = useState({
        name: "Loading..",
        artist: "Loading..",
        icon: "https://www.aceshowbiz.com/images/photo/nicolas_cage.jpg",
        duration: 100,
        current_time: 0,
        url: "https://google.com",
        playing: false
    });

    const getRefreshToken = async () => {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: config.get.spotify().refreshToken,
                client_id: config.get.spotify().clientID,
                client_secret: config.get.spotify().clientSecret
            })
        })

        const data = await response.json();
        if (data.access_token) {
            config.set.spotify.accessToken(data.access_token);
            config.set.spotify.accessTokenTime(Date.now());
            getPlayerData();
            setInterval(() => {
                getPlayerData();
            }, IntervalTime)

        }
    }

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const getPlayerData = async () => {
        const respone = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${config.get.spotify().accessToken}`
            }
        })
        if (respone.status !== 200) { return; }
        const data = await respone.json();
        const tempArt = []
        data.item.artists.forEach(art => {
            tempArt.push(art.name);
        })

        setTimeout(() => {
            setTrackData({
                name: data.item?.name,
                artist: tempArt.toString(),
                icon: data.item?.album.images[1].url,
                duration: data.item?.duration_ms,
                current_time: data?.progress_ms + 1000,
                url: data.item?.external_urls?.spotify,
                playing: data?.is_playing | false
            })
        }, 1300)

        setTrackData({
            name: data.item?.name,
            artist: tempArt.toString(),
            icon: data.item?.album.images[1].url,
            duration: data.item?.duration_ms,
            current_time: data?.progress_ms,
            url: data.item?.external_urls?.spotify,
            playing: data?.is_playing | false
        })
    }



    useEffect(() => {
        if (!config.get.spotify().accessToken) {
            if (config.get.spotify().refreshToken) {
                getRefreshToken();
            }
        }

        if ((Date.now() - Number.parseInt(config.get.spotify().accessTokenTime) > 1800000)) {
            if (config.get.spotify().refreshToken) {
                getRefreshToken();
            }
        } else {
            getPlayerData();
            setInterval(() => {
                getPlayerData();
            }, IntervalTime)
        }
    }, []);
    return (
        <>
            {trackData.playing ? (
                <div className="absolute max-sm:bottom-6 bottom-4 sm:left-4 max-sm:w-full max-sm:px-4 drop-shadow-md">
                    <div className="bg-neutral-950 p-2 rounded-lg flex gap-2 sm:pr-16 max-sm:pr-0">
                        <img className="rounded-lg w-[72px] aspect-square"
                            draggable="false"
                            alt="Album cover"
                            src={trackData?.icon}
                        />
                        <div className="flex flex-col">
                            <div className="flex flex-col justify-start items-start h-fit]">
                                <h1 className="font-semibold text-lg max-w-[220px] truncate">{trackData?.name}</h1>
                                <p className="text-base -mt-0.5 mb-0.5 text-neutral-400 max-w-[220px] truncate">{trackData?.artist}</p>
                            </div>
                            <div className="flex gap-2 items-center justify-end min-w-[230px]">
                                <p className="text-xs text-neutral-500 w-[24px]">{millisToMinutesAndSeconds(trackData?.current_time)}</p>
                                <div className="w-full h-2 border border-solid border-white rounded-full">
                                    <div style={{ width: (trackData?.current_time / trackData?.duration * 100).toFixed() + "%" }} className="rounded-full h-full bg-white" />
                                </div>
                                <p className="text-xs text-neutral-500 w-[24px]">{millisToMinutesAndSeconds(trackData?.duration)}</p>
                            </div>
                        </div>
                    </div>
                    <a href={`${trackData?.url}`} target={"_blank"} rel="noreferrer">
                        <img className="w-[16px] absolute top-2 max-sm:right-6 right-2 opacity-25 hover:opacity-50 ease-in-out duration-100"
                            draggable="false"
                            alt="Spotify Logo"
                            src="/Spotify_Primary_Logo_RGB_White.png"
                        />
                    </a>
                </div>
            ) : null}
        </>
    );
}

export default SpotifyPlayer;