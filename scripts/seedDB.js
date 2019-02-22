const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/googlebooks"
);

const bookSeed = [
    {
        title:"The Colour Of Magic",
        author:"Terry Pratchett",
        description:"In the beginning there was...a turtle. Somewhere on the frontier between thought and reality exists the Discworld, a parallel time and place which might sound and smell very much like our own, but which looks completely different. Particularly as it’s carried though space on the back of a giant turtle (sex unknown). It plays by different rules. But then, some things are the same everywhere. The Disc’s very existence is about to be threatened by a strange new blight: the world’s first tourist, upon whose survival rests the peace and prosperity of the land. Unfortunately, the person charged with maintaining that survival in the face of robbers, mercenaries and, well, Death, is a spectacularly inept wizard...",
        image:"http://books.google.com/books/content?id=ID07FerN_h0C&amp;printsec=frontcover&amp;img=1&amp;zoom=1&amp;source=gbs_api",
        link:"http://books.google.com/books?id=ID07FerN_h0C&amp;dq=pratchett&amp;hl=&amp;source=gbs_api",
        read:"false"
    }
];

db.googleBooks
    .remove({})
    .then(() => db.googleBooks.collection.insertMany(bookSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
