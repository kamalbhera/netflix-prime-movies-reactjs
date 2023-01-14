import React from 'react'

function CardPlaceholder({ dimentions }) {
    return (
        <>
            <div className={`${dimentions} animate-pulse shrink-0 bg-slate-700 rounded-sm md:rounded-lg`}></div>
        </>
    )
}

export default CardPlaceholder