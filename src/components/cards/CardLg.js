import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { ImPlay2 } from 'react-icons/im'

import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

import Moviedetail from "../../pages/Moviedetail"
import CardLgPlaceholder from "../lazyloading/CardLgPlaceholder"

function CardLg({
    id,
    category
}) {

    const [details, setDetails] = useState()
    const [loaded, setLoaded] = useState(false)

    const getDetails = async () => {

        const params = {
            language: 'fr'
        }

        const response = await tmdbApi.details(category, id, { params })
        setDetails(response)
        setLoaded(true)
    }

    useEffect(() => {
        getDetails()
    }, [])


    let landscapePosters = {}

    let imgPath = null

    if (details) imgPath = details.backdrop_path

    if (imgPath) {
        landscapePosters = {
            landscapePoster780: apiConfig.w780Image(details.backdrop_path),
            landscapePoster1280: apiConfig.w1280Image(details.backdrop_path),
            landscapePosterOriginal: apiConfig.originalImage(details.backdrop_path)
        }
    }

    return (
        <>
            {!loaded ?
                <CardLgPlaceholder />
                :
                <Link to={`/${category}/${id}`} element={<Moviedetail />}>
                    {
                        details &&
                        <div className="my-0 rounded-md overflow-hidden relative">
                            {imgPath && <img src={landscapePosters.landscapePoster780} alt="" className="md:hidden" />}
                            {imgPath && <img src={landscapePosters.landscapePoster1280} alt="" className="hidden md:block lg:hidden" />}
                            {imgPath && <img src={landscapePosters.landscapePosterOriginal} alt="" className="hidden lg:block" />}

                            <div className="card-lg-description">
                                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-80 lg:opacity-100"></div>

                                <div className="absolute inset-0 flex flex-col justify-end">
                                    <div className="m-3 lg:m-7 lg:ml-11">

                                        {details.title && <h2 className="font-semibold text-white text-xs sm:text-lg lg:text-2xl" >{details.title}</h2>}

                                        <div className="flex wrap text-gray-300">
                                            {
                                                details.genres &&
                                                details.genres.map((g) =>
                                                    <p key={g.id} className="text-[0.6rem] sm:text-sm lg:text-base after:content-['|'] last:after:content-none after:px-1 border-gray-300">
                                                        {g.name}
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <div className="card-lg-play overflow-hidden inline-flex items-center space-x-1 mt-2">
                                            <ImPlay2 className="play-icon text-white sm:text-lg lg:text-2xl" />
                                            <p className="play-text text-[0.6rem] sm:text-base lg:text-lg text-gray-300"> Voir le trailer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </Link>
            }


        </>


    )
}

export default CardLg