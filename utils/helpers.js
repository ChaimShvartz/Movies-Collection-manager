import readline from "readline-sync";

export function getStatistic(movies) {
    const totalMovies = movies.length;
    let totalRating = 0;
    let topMovie;

    for (const { title, rating } of movies) {
        totalRating += rating;
        if (!topMovie || rating > topMovie.rating) {
            topMovie = { title, rating };
        }
    }
    return {
        "Total movies": totalMovies,
        "Average rating": totalMovies ? totalRating / totalMovies : 0,
        "Top movie": topMovie
            ? `${topMovie.title} (${topMovie.rating})`
            : "No movies yet",
    };
}

export function createMovie() {
    let title, year;
    const CurrentYear = new Date().getFullYear();
    const genre = readline.question("Genre:\n");
    const rating = getRate();
    do {
        if (title !== undefined) console.log("Title must be non-empty");
        title = readline.question("Title:\n").trim();
    } while (!title);
    do {
        if (year !== undefined)
            console.log(`Year must be in range(1900-${CurrentYear})`);
        year = readline.questionInt("Year:\n");
    } while (year < 1900 || year > CurrentYear);
    return { title, genre, year, rating };
}

export function getRate() {
    let rating;
    do {
        if (rating !== undefined) console.log(`Rating must be in range(0-10)`);
        rating = readline.questionFloat("rating:\n");
    } while (rating < 0 || rating > 10);
    return rating;
}

export function getNameToSearch() {
    let nameToSearch;
    do {
        if (nameToSearch !== undefined) console.log("Name must be non-empty");
        nameToSearch = readline.question("Name:\n").trim().toLowerCase();
    } while (!nameToSearch);
    return nameToSearch;
}

export function getLastID(movies) {
    const ids = movies.map((movie) => movie.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
}
