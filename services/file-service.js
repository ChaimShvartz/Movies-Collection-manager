import fs from "fs/promises";

const path = "data/movies.json";

async function loadMoviesAsync() {
    
    try {
        return await fs.readFile(path, "utf8").then(JSON.parse);
    } catch (err) {
        console.error(err.message);
    }
}

async function dumpMoviesAsync(data) {
    try {
        return await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err.message);
    }
}
