const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/myapp';

function connect() {
    return new Promise((resolve, reject) => {

        console.log('Development - WOW!');
        mongoose.connect(DB_URI,
            { useNewUrlParser: true })
            .then((res, err) => {
                if (err) return reject(err);
                resolve(res);
            })

    });
};

function close() {
    return mongoose.disconnect();
};

module.exports = { connect, close };
