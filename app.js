import readline from "readline-sync";
import movieTools from "./services/movie-service.js";
import { loadMoviesAsync } from "./services/file-service.js";
import { createMovie, getNameToSearch, getRate, getStatistic } from "./utils/helpers.js";

function showMenu() {
    console.log(`            
            ==============================
                Movie Collection Manager
            ==============================
    1. Show all movies
    2. Show by id
    3. Create new movie
    4. Delete movie
    5. Update rate
    6. Search by name
    7. Sort by genre
    8. Show statistics
    9. Exit
    `);
}

async function main() {
    let choice;
    const movies = await loadMoviesAsync();
    do {
        showMenu();
        choice = readline.keyIn("Enter your choice:\n", { limit: "$<1-9>" });
        console.log();
        switch (choice) {
            case "1":
                movieTools.showAllMovies(movies);
                break;
            case "2":
                const idToShow = readline.questionInt("ID:\n");
                movieTools.showByID(movies, idToShow);
                break;
            case "3":
                const movie = createMovie();
                await movieTools.appendMovie(movies, movie);
                break;
            case "4":
                const idToRemove = readline.questionInt("ID:\n");
                await movieTools.deleteMovie(movies, idToRemove);
                break;
            case "5":
                const idToUpdate = readline.questionInt("ID:\n");
                const newRate = getRate();
                await movieTools.updateRate(movies, idToUpdate, newRate);
                break;
            case "6":
                const nameToSearch = getNameToSearch()
                await movieTools.searchByName(movies, nameToSearch);
                break;
            case "7":
                const genreToSearch = readline
                    .question("Genre:\n")
                    .toLowerCase();
                await movieTools.searchByGenre(movies, genreToSearch);
                break;
            case "8":
                movieTools.showStatistics(movies);
                break;
            case "9":
                console.log("Goodbye");
                break;
        }
        readline.question("\nPress Enter to continue...");
    } while (choice !== "9");
}
main();
