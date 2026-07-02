import { loadMoviesAsync } from "./file-service.js";

export function showAllMovies(movies) {
    movies.forEach(({ id, title }) => {
        console.log(`${id}. ${title}`);
    });
}

export function showByID(movies, id) {
    const movie = movies.find((movie) => movie.id === id);
    console.log(movie ? movie : "Movie not found");
}

export function createMovieFactory() {
    let id = 1;
    return function (title, genre, year, rating) {
        return { id: id++, title, genre, year, rating };
    };
}


// const createMovie = createMovieFactory();
// console.log(createMovie("a", "n", 2510, 0.6))
// console.log(createMovie("asms", "n", 52510, 0.6))

// readFileAsPromise("./data/movies.json", showAllMovies)
readFileAsPromise("./data/movies.json", (movies) => {
    showByID(movies, 50)
})