import React from 'react';

const ReloadButton = ({ reload }) => {
    return(
        <>
            <div className='flex justify-center items-center border-2 border-solid border-black rounded-[15px]'>
                <button onClick={reload} className='p-4 rounded-[15px]'>
                    <img src="/reload.svg" alt="Reload Button" />
                </button>
            </div>
            <div className='text-gray-400 flex justify-center items-center'>
                <p>Tab + Enter</p>
            </div>
        </>
    )
}

export default ReloadButton;