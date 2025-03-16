import React from 'react';

const ReloadButton = ({ reload }) => {
    return(
        <>
            <div className='flex-col justify-center items-center'>
                <div className='flex justify-center items-center rounded-[15px]'>
                    <button onClick={reload} className='p-4 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#e5f7ef]'>
                        <img src="/reload.svg" alt="Reload Button" />
                    </button>
                </div>
                <div className='flex justify-center items-center mt-2'>
                    <p className='text-[#526777]'>Tab + Enter</p>
                </div>
            </div>
        </>
    )
}

export default ReloadButton;