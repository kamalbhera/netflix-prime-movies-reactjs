import React, { useState, useEffect } from 'react'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import "swiper/css/navigation"
import "swiper/css/free-mode"

// override some swiper styles
import '../items.css'

import Card from "../cards/Card"
import SliderPlaceholder from '../lazyloading/SliderPlaceholder'


function Slider(props) {

    const [items, setItems] = useState([])
    const [loaded, setLoaded] = useState(false)

    const cardSmDimentions = "w-24 sm:w-28 md:w-[155px] lg:w-48 h-36 sm:h-[168px] md:h-56 lg:h-72"
    const cardMdDimentions = "w-36 sm:w-52 h-[213px] sm:h-[308px]"

    const getList = async () => {

        let params = {
            language: 'fr'
        }


        let response = null

        if (props.type !== 'similar') {
            if (props.type !== movieType.discover) {

                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.moviesList(props.type, { params })
                        break

                    default:
                        response = await tmdbApi.tvList(props.type, { params })
                }
            } else {

                params = {
                    language: 'fr',
                    with_genres: props.genre
                }

                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.discoverMovie(props.type, { params })
                        break

                    default:
                        response = await tmdbApi.discoverTv(props.type, { params })
                }
            }

        } else {
            response = await tmdbApi.similar(props.category, props.id)
        }

        setItems(response.results)
        setLoaded(true)
    }

    useEffect(() => {
        getList()
    }, [props.id])

    return (
        <>
            {
                !loaded ?
                    <SliderPlaceholder />
                    :
                    <>
                        <div className="mb-4 sm:mb-3.5 md:mb-16 overflow-hidden">
                            {props.title && <h1 className="ml-2 sm:ml-8 py-2 md:py-2 text-sm sm:text-xl md:text-2xl font-semibold" >{props.title}</h1>}
                            {/* slider Mobile */}
                            <Swiper
                                modules={[FreeMode]}
                                slidesPerView={"auto"}
                                freeMode={true}

                                className="block md:hidden"
                            >
                                {
                                    props.type === 'upcoming' ?
                                        <div className="flex md:hidden overflow-x-scroll no-scrollbar md:overflow-x-hidden pt-2">
                                            {
                                                items && items.map((i) =>

                                                    <SwiperSlide key={i.id} className="space-x-1" >
                                                        <Card key={i.id} id={i.id} poster={i.poster_path} category={props.category} dimentions={cardMdDimentions} />
                                                    </SwiperSlide>
                                                )
                                            }
                                        </div>

                                        :

                                        items && items.map((i) =>
                                            <SwiperSlide key={i.id}>
                                                <Card key={i.id} id={i.id} poster={i.poster_path} category={props.category} dimentions={cardSmDimentions} />
                                            </SwiperSlide>
                                        )
                                }
                            </Swiper>

                            {/* Slider PC */}
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                speed={500}
                                slidesPerView={"auto"}
                                slidesPerGroup={5}
                                className="hidden md:block"
                            >
                                {
                                    items && items.map((i) =>
                                        <SwiperSlide key={i.id}>
                                            <Card key={i.id} id={i.id} poster={i.poster_path} score={i.vote_average} category={props.category} dimentions={cardSmDimentions} />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>
                    </>
            }
        </>

    )
}

export default Slider