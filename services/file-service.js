import fs from "fs/promises";

const path = "data/movies.json";

export async function loadMoviesAsync() {
    try {
        const data = await fs.readFile(path, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error(err.message);
        return [];
    }
}

export async function dumpMoviesAsync(movies) {
    try {
        await fs.writeFile(path, JSON.stringify(movies, null, 2), "utf8");
    } catch (err) {
        console.error(err.message);
    }
}
