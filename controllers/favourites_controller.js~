var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, userId,quizId) {
	models.User.find({
		where: {
			id: Number(userId)
		}
	}).then(function(user) {
		if (user) {
			req.user = user;
		
			next();
		} else{next(new Error('No existe userId=' + userId))}
	}).catch(function(error){next(error)});	
};

// GET /users/:userId/favourites
exports.index = function(req, res) {  

   models.Favourite.findAll({ where:{UserId: Number(req.user.id)}}).then(
     function(quizes) {
       res.render('quizes/index.ejs', {quizes: quizes, errors: []})});
};

//FAV
exports.fav = function(req, res){
	req.user.hasQuiz(req.quiz.id).then(function(result) {
		if (!result) {
			req.user.addQuiz(req.quiz.id);
		}
	});
	res.redirect("/quizes");
};

// DELETE
exports.delete = function(req, res){
	models.Favourites.destroy({where:{ UserId: Number(req.user.id), QuizId: Number(req.quiz.id) }});
	res.redirect("/quizes");
};
