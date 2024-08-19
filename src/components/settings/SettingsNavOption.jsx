import React from "react";

const SettingsNavOption = ({ title = "", children = Element, onClick = () => {}, iconCss = '', currentActive = '' }) => {
    return (
        <div className={`flex items-center gap-1.5 max-sm:bg-opacity-[2%] py-1 px-1.5 bg-white bg-opacity-0 rounded-md cursor-pointer hover:bg-opacity-5 ease-in-out duration-75 select-none ${currentActive === title ? '!bg-opacity-10' : ''}`}
             onClick={onClick}
             role='button'>
            <div className={`bg-neutral-700 p-0.5 rounded-md ${iconCss}`}>
                {children}
            </div>
            <h1 className="text-[0.92rem]">{title}</h1>
        </div>
    )
}

export {
    SettingsNavOption
}