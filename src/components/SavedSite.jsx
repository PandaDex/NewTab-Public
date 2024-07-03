import React, { useState } from 'react'
import { PlusIcon, Trash2Icon } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

function SavedSite({ url, title, icon }) {
    const [del, setDel] = useState(false);
    const removeSite = (url) => {
        const savedSites = localStorage.getItem("NT-savedSites") || "[]";
        const savedSitesArray = JSON.parse(savedSites);
        const newSavedSitesArray = savedSitesArray.filter(site => site.url !== url);
        localStorage.setItem("NT-savedSites", JSON.stringify(newSavedSitesArray));
        location.reload();
    }

    return (
        <div className="flex items-center justify-center flex-col cursor-pointer group peer" onClick={() => {
            setTimeout(() => {
                if (del) { setDel(false); return; }
                location.href = url;
            }, 200);
        }}>
            <div
                className="bg-black dark:bg-white bg-opacity-20 dark:bg-opacity-5 group-hover:bg-opacity-30 dark:group-hover:bg-opacity-10 ease-in-out duration-100 group-hover:scale-105 w-16 aspect-square flex items-center p-4 justify-center rounded-md"
                title={title}>
                <div className='inline-block w-[32px] h-[32px]'>
                    <div
                        className='w-5 h-5 absolute hidden group-hover:flex bg-neutral-700 drop-shadow-sm -mt-6 ml-9 rounded-full justify-center items-center hover:scale-125'
                        onClick={(e) => {
                            setDel(true);
                            e.preventDefault();
                            removeSite(url);
                        }}>
                        <Trash2Icon size={14} />
                    </div>
                    <img src={icon} draggable="false" className="h-fit" alt={title} />
                </div>
            </div>
        </div>
    )
}

function SavedSitePlus({ setSites = () => { } }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [open, setOpen] = useState(false);


    const AddSite = () => {
        const savedSites = localStorage.getItem("NT-savedSites") || "[]";
        const savedSitesArray = JSON.parse(savedSites);
        savedSitesArray.push({ title: title, url: url, icon: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32` });
        localStorage.setItem("NT-savedSites", JSON.stringify(savedSitesArray));
        setSites(savedSitesArray);
        setOpen(false);
        setTitle("");
        setUrl("");
    }

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger >
                    <div className="text-center cursor-pointer group max-w-24 flex flex-col items-center">
                        <div className="bg-black dark:bg-white bg-opacity-20 dark:bg-opacity-5 group-hover:bg-opacity-30 dark:group-hover:bg-opacity-10 ease-in-out duration-100 group-hover:scale-105 w-16 aspect-square flex items-center p-4 justify-center rounded-md">
                            <PlusIcon className='h-fit' size={32} />
                        </div>
                    </div>
                </SheetTrigger>
                <SheetContent className="border-neutral-300 dark:border-neutral-800 text-black dark:text-white">
                    <SheetHeader>
                        <SheetTitle>Add site to favorites</SheetTitle>
                    </SheetHeader>
                    <div className='flex flex-col gap-4 mt-10'>
                        <span>
                            <Label htmlFor="title">Site Title</Label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text" />
                        </span>
                        <span>
                            <Label htmlFor="title">Site URL</Label>
                            <Input value={url} onChange={(e) => setUrl(e.target.value)} id="title" type="text" />
                        </span>
                        <Button variant="default" onClick={() => AddSite()}>Add</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>

    )
}

export default SavedSite
export { SavedSitePlus }
