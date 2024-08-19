import {
    AudioLinesIcon,
    ClockIcon,
    CloudyIcon,
    Settings2Icon,
    SettingsIcon,
    CaseUpperIcon
} from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';

import {SettingsNavOption} from "@/components/settings/SettingsNavOption";
import {GeneralSettings} from "@/components/settings/GeneralSettings";
import {ClockSettings} from "@/components/settings/ClockSettings";
import {SpotifySettings} from "@/components/settings/SpotifySettings";
import {WeatherSettings} from "@/components/settings/WeatherSettings";
import {SuggestionSettings} from "@/components/settings/SuggestionSettings.jsx";

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
            case 'Suggestions':
                return <SuggestionSettings />
            default:
                return "Not Found";
        }
    }
    return (
        <div className='w-screen h-screen absolute z-10 bg-black backdrop-blur-sm bg-opacity-40 flex justify-center items-center'>
            <div className='p-2 bg-neutral-200 text-black dark:text-white dark:bg-neutral-900 rounded-md flex h-[600px] max-sm:h-[710px] max-sm:flex-col max-[412px]:scale-75'>
                <aside className='h-full max-sm:h-fit max-sm:w-full w-[200px]'>
                    <h1 className='text-xl font-semibold mb-2'>Settings</h1>
                    <div className='py-2 max-sm:-mt-2 max-sm:pl-4 sm:h-full flex flex-col gap-1 max-sm:flex-row max-sm:items-center max-sm:gap-3'>
                        <SettingsNavOption title='General' iconCss='bg-neutral-700 text-white max-sm:hidden' currentActive={currentTab} onClick={() => setCurrentTab('General')}>
                            <Settings2Icon size={26} />
                        </SettingsNavOption>
                        <div className='w-full h-[1px] my-1 bg-neutral-300 dark:bg-neutral-700 max-sm:hidden' />
                        <SettingsNavOption title='Clock' iconCss='bg-neutral-700 text-white max-sm:hidden' currentActive={currentTab} onClick={() => setCurrentTab('Clock')}>
                            <ClockIcon size={26} />
                        </SettingsNavOption>
                        <SettingsNavOption title='Spotify' iconCss='bg-neutral-700 text-white max-sm:hidden' currentActive={currentTab} onClick={() => setCurrentTab('Spotify')}>
                            <AudioLinesIcon size={26} />
                        </SettingsNavOption>
                        <SettingsNavOption title='Suggestions' iconCss='bg-neutral-700 text-white max-sm:hidden' currentActive={currentTab} onClick={() => setCurrentTab('Suggestions')}>
                            <CaseUpperIcon size={26} />
                        </SettingsNavOption>
                        <SettingsNavOption title='Weather' iconCss='bg-neutral-700 text-white max-sm:hidden' currentActive={currentTab} onClick={() => setCurrentTab('Weather')}>
                            <CloudyIcon size={26} />
                        </SettingsNavOption>
                        <div className='h-full w-full flex mb-6 items-center justify-end flex-col max-sm:hidden'>
                            <Button className="w-[90%] mb-2" variant="destructive" onClick={() => setModalState(!modalState)}>Close</Button>
                            <p className='text-[10px] text-neutral-600 dark:text-neutral-400'>*For new changes to take effect page need to be refreshed</p>
                        </div>
                    </div>
                </aside>
                <div className='w-[1px] bg-neutral-300 dark:bg-neutral-700 mx-1 max-sm:hidden'>
                </div>
                <div className='h-full w-[400px] max-sm:-mt-4'>
                    <SettingsRouter tab={currentTab} />
                </div>
                <div className='w-full h-fit flex flex-col items-center justify-end flex-shrink-0 sm:hidden'>
                    <Button className="w-[60%]" variant="destructive" onClick={() => setModalState(!modalState)}>Close</Button>
                    <p className='text-[10px] text-neutral-600 dark:text-neutral-400'>*For new changes to take effect page need to be refreshed</p>
                </div>
            </div>
        </div>
    )
}

export default Settings
