const mongoose = require("mongoose");

atlas =
  "mongodb+srv://pripritam7:42I2OCzeZFsEYfT2@cluster0.sokdjwb.mongodb.net/BookBinge";

mongoose.Promise = global.Promise;

mongoose
  .connect(atlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => console.log(error.message));