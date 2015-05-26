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

   models.Favourites.findAll({ where:{UserId: Number(req.params.userId)}}).then(
     function(quizes) {
       res.render('quizes/index.ejs', {quizes: quizes, errors: []})});
};

// DELETE
exports.delete = function(req, res){
	models.Favourites.destroy({where:{ UserId: Number(req.user.id), QuizId: Number(req.quiz.id) }});
	res.redirect("/quizes");
};

//FAV
exports.fav = function(req, res){
	//req.body.quiz.UserId = req.session.user.id;
	var fav = models.Favourites.build(	//crea objeto fav
    {UserId: req.session.user.id, QuizId:req.params.quizId}
  );
  fav.save({fields: ["UserId", "QuizId"]}).then( function(){res.redirect('/quizes')})
};