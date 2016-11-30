/**
 * Created by peter on 2016-11-29.
 */

var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');


var gameListSchema = new mongoose.Schema({
    // empty schema is ok as passport defines username / password automatically
    game: {
        type: String,
        required: 'Please enter the name of game'
    },
    companyName: {
        type: String,
        required: 'Please emter the name of company'
    }

});

gameListSchema.plugin(plm);

// make this public
module.exports = mongoose.model('gameList', gameListSchema);