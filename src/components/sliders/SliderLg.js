import { useState, useEffect } from 'react'

import tmdbApi, { movieType, category } from '../../api/tmdbApi'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper'


import CardLg from '../cards/CardLg'
import CardLgPlaceholder from '../lazyloading/CardLgPlaceholder'

// Import Swiper styles
import "swiper/css"
import 'swiper/css/autoplay';

// override some swiper style
import '../items.css'



function SliderLg(props) {

    const [nowPlaying, setNowPlaying] = useState()
    const [loaded, setLoaded] = useState(false)

    const getnowPlaying = async () => {

        const params = {
            language: 'fr'
        }
        const response = await tmdbApi.moviesList(props.type, { params })

        setNowPlaying(response.results.splice(0, 5))
        setLoaded(true)
    }

    useEffect(() => {
        getnowPlaying()
    }, [])

    return (
        <div className='swipper-lg overflow-hidden py-2 md:py-3'>
            {!loaded ?
                <div className='w-fit m-auto'>
                    <CardLgPlaceholder />
                </div>

                :
                <Swiper
                    modules={[Autoplay]}
                    centeredSlides={true}
                    spaceBetween={10}
                    loop={true}
                    speed={500}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}

                    slidesPerView={1.2}

                    breakpoints={{
                        768: {
                            slidesPerView: 1.9
                        }
                    }}
                >

                    {
                        nowPlaying &&
                        nowPlaying.map((n) =>
                            <SwiperSlide className='relative' key={n.id} >
                                <CardLg key={n.id} id={n.id} category={category.movie} />
                            </SwiperSlide>
                        )
                    }

                </Swiper>
            }

        </div >
    )
}

export default SliderLg