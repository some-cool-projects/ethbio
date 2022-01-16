const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      unique: true
   },
   address: {
        type: String,
        unique: true
   },
   links: [{ title: String, url: String }],
   pfp: String
})

userSchema.plugin(mongoose_fuzzy_searching, { fields: ['username', 'address'] });
const User = mongoose.model('user', userSchema);
module.exports = {
	User
}