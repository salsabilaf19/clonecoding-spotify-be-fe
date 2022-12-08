const mongoose = require("mongoose");

module.exports = async () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/spotify', connectionParams);
		// await mongoose.connect(process.env.DB, connectionParams);
		console.log("connected to database successfully");
	} catch (error) {
		console.log("could not connect to database.", error);
	}
};