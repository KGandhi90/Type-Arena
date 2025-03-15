import React from 'react';

const ReloadButton = ({ reload }) => {
    return(
        <>
            <div className='flex-col justify-center items-center'>
                <div className='flex justify-center items-center rounded-[15px]'>
                    <button onClick={reload} className='p-4 rounded-[15px]'>
                        <img src="/reload.svg" alt="Reload Button" />
                    </button>
                </div>
                <div className='text-gray-400 flex justify-center items-center'>
                    <p className='text-[#326984]'>Tab + Enter</p>
                </div>
            </div>
        </>
    )
}

export default ReloadButton;