import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import tmdbApi, { movieType, tvType } from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'

import ShowMoreText from 'react-show-more-text'
import { Scrollbars } from 'react-custom-scrollbars-2'

import Slider from '../components/sliders/Slider'
import avatar from '../images/profile_avatar_placeholder.png'
import Loading from '../components/lazyloading/Loading'

function Moviedetail() {

    const params = useParams()

    const id = params.movieId
    const category = params.category

    const [details, setDetails] = useState()
    const [cast, setCast] = useState([])
    const [videos, setVideos] = useState([])
    const [watchProviders, setWatchProviders] = useState()
    const [loaded, setLoaded] = useState(false)

    const getDetails = async () => {
        const params = {
            language: 'fr'
        }
        const response = await tmdbApi.details(category, id, { params })

        setDetails(response)
        setLoaded(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const getCast = async () => {
        const params = {
            language: 'fr'
        }
        const response = await tmdbApi.credits(category, id, { params })
        setCast(response.cast.splice(0, 5))
    }

    const getWatchProviders = async () => {
        const params = {}
        const response = await tmdbApi.watchProviders(category, id, { params })

        if (response.results.FR) {
            setWatchProviders(response.results.FR)
        } else if (response.results.US) setWatchProviders(...watchProviders, response.results.US)
    }

    const getVideos = async () => {
        const params = {
            language: 'fr',
            include_video_language: 'en-US'
        }

        const response = await tmdbApi.videos(category, id, { params })

        setVideos(response.results.splice(0, 5))
    }

    useEffect(() => {
        getDetails()
        getCast()
        getVideos()
        getWatchProviders()
    }, [id])


    let posterPath = null
    let landscapePosters = {}
    let posters = {}

    if (details) posterPath = details.backdrop_path

    if (posterPath) {
        landscapePosters = {
            landscapePoster780: apiConfig.w780Image(details.backdrop_path),
            landscapePoster1280: apiConfig.w1280Image(details.backdrop_path),
            landscapePosterOriginal: apiConfig.originalImage(details.backdrop_path)
        }

        posters = {
            poster300: apiConfig.w300Image(details.poster_path),
            poster500: apiConfig.w500Image(details.poster_path),
        }
    }

    return (
        <>
            {!loaded ?
                <Loading />
                : details.backdrop_path ?
                    <div>
                        <div className="relative">
                            {/* backdrop poster */}
                            <>
                                <img src={landscapePosters.landscapePoster780} alt="movie backdrop poster" className='md:hidden' />
                                <img src={landscapePosters.landscapePoster1280} alt="movie backdrop poster" className='w-full h-[700px] object-cover relative hidden md:block' />
                            </>

                            <div className="absolute inset-0 bg-gradient-to-t from-[#020916] md:to-[rgba(0,0,0,0.50)]"></div>
                        </div>

                        {details &&
                            <div className='space-y-4 -translate-y-16 md:translate-y-0'>

                                <div className="space-y-2 md:flex justify-center items-center md:mb-28 lg:space-x-20 md:absolute md:top-[-656px] md:right-0 md:left-0">

                                    {/* Lien voir film */}
                                    {watchProviders &&
                                        <div className="flex space-x-2 justify-start items-center md:hidden mx-4 md:mx-0">
                                            <a href={watchProviders.link}>
                                                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="tmdb logo" className='w-20' />
                                            </a>

                                            <div className='text-md'>
                                                <p className='text-gray-300'>Visionnage sur themoviedb.org</p>
                                                <a className='font-bold' href={watchProviders.link}>Regarder maintenant</a>
                                            </div>
                                        </div>
                                    }

                                    {/* movie poster + lien voir film */}
                                    <div className='bg-[#020916] rounded-md overflow-hidden mx-4 drop-shadow-md'>
                                        <img src={posters.poster300} alt="" className='hidden md:block w-64' />
                                        {watchProviders &&
                                            <div className="hidden md:flex space-x-2 items-center p-3">
                                                <a href={watchProviders.link}>
                                                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb logo" className='w-9' />
                                                </a>

                                                <div className='text-xs'>
                                                    <p className='text-gray-300 w-max'>Visionnage sur themoviedb.org</p>
                                                    <a className='font-bold' href={watchProviders.link}>Regarder maintenant</a>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className='md:w-2/3 md:max-w-lg md:mx-2 space-y-4'>

                                        {/* Titre et genres */}
                                        {category === "movie" ?
                                            <h1 className='text-4xl font-semibold text-gray-50 mx-4 md:mx-0' >{details.title}</h1>
                                            : <h1 className='text-4xl font-semibold text-gray-50 mx-4 md:mx-0' >{details.name}</h1>
                                        }

                                        {details.genres &&
                                            <div className='flex justify-start flex-wrap w-fit text-md mx-4 md:mx-0 my-3 md:my-2 text-gray-300'>
                                                {details.genres.map(genre =>
                                                    <div key={genre.id} className='border-2 border-gray-200 rounded-full px-2 py-[2px] min-w-max m-1'>{genre.name}</div>
                                                )}
                                            </div>
                                        }

                                        {/* Description */}
                                        {details.overview &&
                                            <div className='mx-4 md:mx-0'>
                                                <h2 className='font-semibold text-lg text-gray-50 pb-1'>Synopsis</h2>
                                                <ShowMoreText
                                                    /* Default options */
                                                    lines={5}
                                                    more="Voir plus"
                                                    less="Voir moins"
                                                    className="text-base text-gray-300 w-full "
                                                    anchorClass="text-gray-400 text-base"
                                                    expanded={false}
                                                    width={0}
                                                    truncatedEndingComponent={"...  "}
                                                >
                                                    <p className=''>{details.overview}</p>
                                                </ShowMoreText>
                                            </div>
                                        }

                                        {/* slider casting */}
                                        {
                                            cast &&
                                            <div className='ml-4 md:mx-0'>
                                                <h2 className='font-semibold text-lg pt-2 text-gray-50'>Casting</h2>
                                                <div className="flex md:flex-wrap space-x-2 overflow-x-scroll no-scrollbar md:overflow-auto ">

                                                    {cast.map((c) =>
                                                        <div key={c.id} className='my-2'>
                                                            {c.profile_path ?
                                                                <img
                                                                    src={`https://image.tmdb.org/t/p/w300${c.profile_path}`}
                                                                    alt="profile"
                                                                    className='h-28 lg:h-32 rounded-md mr-1'
                                                                />
                                                                :
                                                                <img
                                                                    src={avatar}
                                                                    alt='indisponible'
                                                                    className='h-28 lg:h-32 rounded-md mr-1 w-[75px] lg:w-[85px] object-cover'
                                                                />
                                                            }

                                                            <p className='m-1 text-xs w-[70px] lg:w-20'>{c.name}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* trailers */}
                                {videos.length !== 0 &&
                                    <div className='ml-3'>
                                        <h2 className='font-semibold text-lg py-2 text-gray-50'>Vidéos et trailers</h2>

                                        {/* scroll pc */}
                                        <div className='hidden md:block'>
                                            <Scrollbars
                                                style={{ width: "100%", height: "26.5vw" }}
                                                hideTracksWhenNotNeeded
                                                renderThumbHorizontal={({ style, ...props }) =>
                                                    <div {...props}
                                                        style={{
                                                            ...style,
                                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                            borderRadius: "10px"
                                                        }}
                                                    />
                                                }
                                            >
                                                <div className="flex">
                                                    {videos.map(video =>
                                                        <div className='shrink-0' key={video.key} >
                                                            <iframe
                                                                title={video.key}
                                                                src={`https://youtube.com/embed/${video.key}?rel=0`}
                                                                frameBorder="0"
                                                                allowFullScreen
                                                                loading='lazy'
                                                                className='w-[45vw] h-[25vw]'>
                                                            </iframe>
                                                        </div>
                                                    )}
                                                </div>
                                            </Scrollbars>
                                        </div>

                                        {/* scroll mobile */}
                                        <div className="flex overflow-x-scroll no-scrollbar md:hidden">
                                            {videos.map(video =>
                                                <div className='shrink-0' key={video.key} >
                                                    <iframe
                                                        title={video.key}
                                                        src={`https://youtube.com/embed/${video.key}?rel=0`}
                                                        frameBorder="0"
                                                        allowFullScreen
                                                        loading='lazy'
                                                        className='w-[90vw] h-[55vw]'>
                                                    </iframe>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }

                                {/* slider Similaires */}
                                <div className='similar'>
                                    <h2 className='font-semibold text-lg py-2 mx-3 text-gray-50'>Similaires</h2>
                                    <div className="relative">
                                        <Slider type={category === category.movie ? movieType.similar : tvType.similar} category={category} id={id} />
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                    :
                    <div className='h-[82vh]'>
                        <p className='w-fit m-auto font-semibold md:text-lg p-4'>Description insidponible</p>
                    </div>

            }
        </>
    )
}

export default Moviedetail