import { CloudDrizzleIcon, CloudFogIcon, CloudHailIcon, CloudIcon, CloudLightningIcon, CloudMoonIcon, CloudMoonRainIcon, CloudRainIcon, CloudSnowIcon, CloudSunIcon, CloudSunRainIcon, CloudyIcon, MapPin, MoonIcon, SnowflakeIcon, SunIcon, ThermometerSnowflakeIcon, ThermometerSunIcon, WindIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import config from '@/utils/UserConfig';

function Clock() {
    const [time, setTime] = useState("00:00");
    const [weatherData, setWeatherData] = useState(null);
    const GetTime = () => {
        const date = new Date();
        let hour;
        let minutes;

        if (date.getHours().toString().length === 1) {
            hour = `0${date.getHours()}`
        } else {
            hour = date.getHours()
        }

        if (date.getMinutes().toString().length === 1) {
            minutes = `0${date.getMinutes()}`
        } else {
            minutes = date.getMinutes()
        }
        setTime(`${hour}:${minutes}`)
    }

    const WetherIcon = ({ index, size = 1 }) => {
        switch (index) {
            case 1:
                return <SunIcon size={size} />
            case 2:
                return <SunIcon size={size} />
            case 3:
                return <CloudSunIcon size={size} />
            case 4:
                return <CloudSunIcon size={size} />
            case 5:
                return <CloudSunIcon size={size} />
            case 6:
                return <CloudIcon size={size} />
            case 7:
                return <CloudyIcon size={size} />
            case 8:
                return <CloudyIcon size={size} />
            case 11:
                return <CloudFogIcon size={size} />
            case 12:
                return <CloudDrizzleIcon size={size} />
            case 13:
                return <CloudSunRainIcon size={size} />
            case 14:
                return <CloudSunRainIcon size={size} />
            case 15:
                return <CloudLightningIcon size={size} />
            case 16:
                return <CloudLightningIcon size={size} />
            case 17:
                return <CloudLightningIcon size={size} />
            case 18:
                return <CloudRainIcon size={size} />
            case 19:
                return <CloudHailIcon size={size} />
            case 20:
                return <CloudHailIcon size={size} />
            case 21:
                return <CloudHailIcon size={size} />
            case 22:
                return <CloudSnowIcon size={size} />
            case 23:
                return <CloudSnowIcon size={size} />
            case 24:
                return <SnowflakeIcon size={size} />
            case 25:
                return <CloudHailIcon size={size} />
            case 26:
                return <CloudHailIcon size={size} />
            case 29:
                return <CloudSnowIcon size={size} />
            case 30:
                return <ThermometerSunIcon size={size} />
            case 31:
                return <ThermometerSnowflakeIcon size={size} />
            case 32:
                return <WindIcon size={size} />
            case 33:
                return <MoonIcon size={size} />
            case 34:
                return <MoonIcon size={size} />
            case 35:
                return <CloudMoonIcon size={size} />
            case 36:
                return <CloudMoonIcon size={size} />
            case 37:
                return <CloudyIcon size={size} />
            case 38:
                return <CloudyIcon size={size} />
            case 39:
                return <CloudMoonRainIcon size={size} />
            case 40:
                return <CloudMoonRainIcon size={size} />
            case 41:
                return <CloudMoonRainIcon size={size} />
            case 42:
                return <CloudLightningIcon size={size} />
            case 43:
                return <CloudHailIcon size={size} />
            case 44:
                return <CloudSnowIcon size={size} />
            default:
                return 'Unknown Icon';
        }
    }

    const GetWeatherData = async () => {
        if (config.get.weather().enabled !== "true") {
            return;
        }

        if (Date.now() - Number.parseInt(config.get.weather().lastUpdate) < 900000) {
            setWeatherData(JSON.parse(config.get.weather().cahce));
            return;
        }
        const response = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${config.get.weather().cityId}?apikey=${config.get.weather().apiKey}&language=en-us&metric=${config.get.weather().unit}`, {
            method: 'GET'
        })
        const data = await response.json();
        setWeatherData(data[0]);
        config.set.weather.cahce(JSON.stringify(data[0]));
        config.set.weather.lastUpdate(Date.now());
        return;
    }
    useEffect(() => {
        GetTime();
        GetWeatherData();
        const interval1 = setInterval(() => {
            GetTime()
        }, 1000)

        return () => {
            clearInterval(interval1);
        }
    }, []);
    return (
        <div className="absolute sm:top-5 text-black dark:text-white max-sm:top-0 max-sm:h-1/2 sm:left-5 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-end max-sm:pb-36 min-h-[250px]">
            <div className='w-fit flex flex-col items-center'>
                <h1 className="font-medium text-7xl select-none">{time}</h1>
                {config.get.weather().enabled === "true" ? (
                    <span className='flex gap-1.5 items-center select-none'>
                        <span className='flex gap-0.5 items-center'>
                            <WetherIcon index={weatherData?.WeatherIcon} size={19} />
                            <p>{weatherData?.IconPhrase}</p>
                        </span>
                        <p>{weatherData?.Temperature.Value.toFixed(0)}°{weatherData?.Temperature.Unit}</p>
                        <span className='flex gap-0.5 items-center'>
                            <MapPin size={16} />
                            <p>{(weatherData?.Link.split("/")[5].charAt(0).toUpperCase() + weatherData?.Link.split("/")[5].slice(1)).toString()}</p>
                        </span>
                    </span>
                ) : null}
            </div>
        </div>
    );
}

export default Clock;