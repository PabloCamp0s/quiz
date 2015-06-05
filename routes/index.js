var express = require( 'express' );
var router = express.Router();

var quizes = require( '../controllers/quiz_controller' );
var comments = require( '../controllers/comment_controller' );
var sessions = require( '../controllers/session_controller' );

/* GET home page. */
router.get(
  '/' , function ( req , res , next )
  {
    res.render( 'index' , { title : 'Quiz' , errors : [] } );
  }
);

// Autoload de comandos con :quizId
router.param( 'quizId' , quizes.load );

// Definición de rutas de sesión
router.get( '/login' , sessions.new );
router.post( '/login' , sessions.create );
router.delete( '/login' , sessions.destroy );

// Definición de rutas de /quizes
router.get( '/quizes' , quizes.index );
router.get( '/quizes/:quizId(\\d+)' , quizes.show );
router.get( '/quizes/:quizId(\\d+)/answer' , quizes.answer );
router.get( '/quizes/new' , quizes.new );
router.post( '/quizes' , quizes.create );
router.get( '/quizes/:quizId(\\d+)/edit' , quizes.edit );
router.put( '/quizes/:quizId(\\d+)' , quizes.update );
router.delete( '/quizes/:quizId(\\d+)' , quizes.destroy );

router.get( '/quizes/:quizId(\\d+)/comments/new' , comments.new );
router.post( '/quizes/:quizId(\\d+)/comments' , comments.create );

router.get(
  '/author' , function ( req , res , next )
  {
    res.render( 'author' , { errors : [] } );
  }
);

module.exports = router;
