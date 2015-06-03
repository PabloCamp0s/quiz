var express = require( 'express' );
var router = express.Router();

var quizes = require( '../controllers/quiz_controller' );

/* GET home page. */
router.get(
  '/' , function ( req , res , next )
  {
    res.render( 'index' , { title : 'Quiz' } );
  }
);

// Autoload de comandos con :quizId
router.param( 'quizId' , quizes.load );

// Definición de rutas de /quizes
router.get( '/quizes' , quizes.index );
router.get( '/quizes/:quizId(\\d+)' , quizes.show );
router.get( '/quizes/:quizId(\\d+)/answer' , quizes.answer );
router.get( '/quizes/new' , quizes.new );
router.post( '/quizes' , quizes.create );

router.get(
  '/author' , function ( req , res , next )
  {
    res.render( 'author' )
  }
);

module.exports = router;
