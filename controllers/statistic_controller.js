var models = require( '../models/models.js' );

// GET /quizes/statistics
exports.show = function ( req , res )
{
  var totalQuizzes = 0 , totalComments = 0 , quizzesWithComments = 0;
  models.Quiz.findAll( { include : [ { model : models.Comment } ] } ).then(
    function ( quizzes )
    {
      quizzes.forEach(
        function ( quiz )
        {
          totalQuizzes++;
          totalComments += quiz.Comments.length;
          quizzesWithComments += (
            (
              quiz.Comments.length > 0
            ) ? 1 : 0
          );
        }
      );
      res.render(
        'statistics/show' ,
        {
          totalQuizzes : totalQuizzes ,
          totalComments : totalComments ,
          averageComments : totalComments / totalQuizzes ,
          quizzesWithComments : quizzesWithComments ,
          quizzesWithoutComments : totalQuizzes - quizzesWithComments ,
          errors : []
        }
      );
    }
  );
}
