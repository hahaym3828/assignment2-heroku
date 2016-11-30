/**
 * Created by peter on 2016-11-29.
 */
var express = require('express');
var router = express.Router();

// link to the game model
var game = require('../models/gameList');

// auth check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

// GET main gameList page
router.get('/', isLoggedIn, function(req, res, next) {
    // use the game model to query the db for game data
    game.find(function(err, gameList) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the gameList page and pass the query result
            res.render('gameList', {
                title: 'The best games I have played',
                gameList: gameList,
                user: req.user
            });
        }
    });
});



/* GET /game/add  */
router.get('/add', isLoggedIn, function(req, res, next) {
    res.render('add-game', {
        title: 'Add a New game',
        user: req.user
    } );
});

/* POST /game/add */
router.post('/add', isLoggedIn, function(req, res, next) {
    // get the form inputs & use mongoose to insert to the db
    gameList.create( {
        game: req.body.game,
        companyName: req.body.companyName

    }, function(err, Drink) {
        if (err) {
            console.log(err);
            res.render('error', { message: 'Could not add'} );
        }
        else {
            res.redirect('/gameList');
        }
    });
});

/* GET /game/delete*/
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // delete the document with this _id
    Drink.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Delete ',
                error: err
            });
        }
        else {
            res.redirect('/gameList');
        }
    });
});


router.get('/:_id', isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;
    // use Mongoose to get the selected game document
    game.findById( { _id: _id }, function(err, game) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Load game',
                error: err
            });
        }
        else {
            res.render('edit-game', {
                title: 'Edit a game',
                game: game,
                user: req.user
            });
        }
    });
});


// make public
module.exports = router;