const mongoose = require('mongoose');

const connectToDB = (url) => {
    return mongoose.connect(url)
        .then(x => {
            console.log("connected to db successfully!");
        });
};

module.exports = connectToDB;
