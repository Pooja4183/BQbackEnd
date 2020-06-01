const mongoose = require('mongoose');

connect = () => {
  mongoose
    .connect(
      'mongodb+srv://Bipul:YJxtNh3ZdUoGhLRB@moviecluster-dkliz.mongodb.net/movie-data?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('connected to database!');
    })
    .catch((err) => {
      console.log('connection failed!' + err);
    });
};

module.exports = { connect };
