import { dumpMoviesAsync, loadMoviesAsync } from "./file-service.js";
import { getLastID, getStatistic } from "../utils/helpers.js";

function showAllMovies(movies) {
    if (!movies.length) return console.log("No movies yet");

    console.log("Movies list:");
    for (const { id, title } of movies) {
        console.log(`${id}. ${title}`);
    }
}

function showByID(movies, id) {
    const movie = movies.find((movie) => movie.id === id);
    console.log(movie ? movie : "Movie not found");
}

async function createMovieFactory() {
    const movies = await loadMoviesAsync();
    console.log(movies);
    let id = getLastID(movies);
    console.log(id);
    
    return async function (movies, movie) {
        movies.push({ id: id++, ...movie });
        await dumpMoviesAsync(movies);
    };
}

async function deleteMovie(movies, id) {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index === -1) return console.log("Movie not found");
    const deletedMovie = movies[index].title;
    movies.splice(index, 1);
    await dumpMoviesAsync(movies);
    console.log(deletedMovie, "deleted successfully");
}

async function updateRate(movies, id, newRate) {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index === -1) return console.log("Movie not found");
    movies[index].rating = newRate;
    await dumpMoviesAsync(movies);
    console.log(movies[index].title, "updated successfully");
}

async function searchByName(movies, name) {
    let found;
    for (const movie of movies) {
        if (movie.title.toLowerCase().includes(name)) {
            console.log(movie);
            found = true;
        }
    }
    if (!found) console.log("Results not found");
}

async function searchByGenre(movies, genre) {
    let found;
    for (const movie of movies) {
        if (movie.genre.toLowerCase() === genre) {
            console.log(movie);
            found = true;
        }
    }
    if (!found) console.log("Results not found");
}

function showStatistics(movies) {
    const statistics = getStatistic(movies);
    console.log(statistics);
}

export default {
    showAllMovies,
    showByID,
    appendMovie: await createMovieFactory(),
    deleteMovie,
    updateRate,
    searchByName,
    searchByGenre,
    showStatistics,
};
