var express = require('express');
var router = express.Router();

var quizes = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question',quizes.question);
router.get('/quizes/answer',quizes.answer);

router.get('/author',function(req,res,next){
  res.render('author')
});

module.exports = router;
