import fs from "fs";

export function readFileAsPromise(path, cb) {
    fs.readFile(path, "utf8", (err, data) => {
        try {
            if (err) throw new Error(err);
            cb(JSON.parse(data));
        } catch (err) {
            console.error(err.message);
        }
    });
}

export function writeFileAsPromise(path, data) {
    fs.writeFile(path, JSON.stringify(data), "utf8", (err) => {
        try {
            if (err) throw new Error(err);
            console.log("File writed successfully");
        } catch (err) {
            console.error(err.message);
        }
    });
}

writeFileAsPromise("./data/movies.json", {msg: "hiiiii"});
