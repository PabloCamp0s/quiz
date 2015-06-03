var express = require( 'express' );
var router = express.Router();

var quizes = require( '../controllers/quiz_controller' );

/* GET home page. */
router.get(
  '/' , function ( req , res , next )
  {
    res.render( 'index' , { title : 'Quiz' , errors : [] } );
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
router.get( '/quizes/:quizId(\\d+)/edit' , quizes.edit );
router.put( '/quizes/:quizId(\\d+)' , quizes.update );

router.get(
  '/author' , function ( req , res , next )
  {
    res.render( 'author' , { errors : [] } );
  }
);

module.exports = router;
