const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '273b3631cd2eec9fe3cb080a711dcc44',
    originalImage: (imagePath) => `https://image.tmdb.org/t/p/original${imagePath}`,
    w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500${imagePath}`,
    w300Image: (imagePath) => `https://image.tmdb.org/t/p/w300${imagePath}`,
    w780Image: (imagePath) => `https://image.tmdb.org/t/p/w780${imagePath}`,
    w1280Image: (imagePath) => `https://image.tmdb.org/t/p/w1280${imagePath}`
}

export default apiConfig