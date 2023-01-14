import { useState } from 'react'
import { Link } from "react-router-dom"
import apiConfig from '../../api/apiConfig'

import { BsFillPlayBtnFill } from 'react-icons/bs'

import Moviedetail from "../../pages/Moviedetail"
import CardPlaceholder from '../lazyloading/CardPlaceholder'

function Card({
    id,
    poster,
    category,
    dimentions
}) {

    const image = apiConfig.w300Image(poster)

    return (
        <>
            {poster &&
                <Link to={`/${category}/${id}`} element={<Moviedetail />} >
                    <div
                        className={`${dimentions} card relative shrink-0 transition-transform duration-300 `}
                    >
                        <img
                            src={image}
                            alt="movie poster"
                            className='h-full w-full object-cover rounded-md md:rounded-lg'
                        />
                        <div className='background absolute inset-0 bg-gray-900 bg-opacity-50 flex flex-col justify-center items-center invisible opacity-0 transition-opacity duration-300 rounded-sm md:rounded-lg'>
                            <BsFillPlayBtnFill className='play scale-[0.002] text-2xl sm:text-3xl md:text-5xl text-amber-400 hover:text-amber-300 transition-all duration-300' />
                        </div>
                    </div>
                </Link>

            }
        </>
    )
}

export default Card