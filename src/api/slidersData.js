import { movieType, tvType, category } from "./tmdbApi"

const moviesTrending = {
    type: movieType.popular,
    category: category.movie,
    title: 'Films populaires',
    genre: null
}
const tvTrending = {
    type: tvType.popular,
    category: category.tv,
    title: 'Séries populaires',
    genre: null
}
const upcoming = {
    type: movieType.upcoming,
    category: category.movie,
    title: 'A venir',
    genre: null
}
const moviesRated = {
    type: movieType.top_rated,
    category: category.movie,
    title: 'Films les mieux notés',
    genre: null
}
const tvRated = {
    type: tvType.top_rated,
    category: category.tv,
    title: 'Séries les mieux notés',
    genre: null
}
const horror = {
    type: movieType.discover,
    category: category.movie,
    title: 'Horreur',
    genre: '27'
}
const comedy = {
    type: movieType.discover,
    category: category.movie,
    title: 'Comédie',
    genre: '35'
}
const dramma = {
    type: movieType.discover,
    category: category.tv,
    title: 'Drame',
    genre: '18'
}
const documentary = {
    type: movieType.discover,
    category: category.tv,
    title: 'Documentaire',
    genre: '99'
}

const slider = [
    moviesTrending,
    tvTrending,
    moviesRated,
    tvRated,
    upcoming,
    horror,
    comedy,
    dramma,
    documentary
]

export default slider