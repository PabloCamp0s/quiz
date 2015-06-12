var models = require( '../models/models.js' );

// GET /quizes/statistics
exports.show = function ( req , res )
{
  models.Quiz.count().then(
    function ( totalQuizes )
    {
      models.Comment.count( { where : { publicado : true } } ).then(
        function ( totalComments )
        {
          // ToDo pendiente de realizar
          models.Quiz.findAll( { include : [ { model : models.Comment } ] } ).then(
            function ( c )
            {
              res.render(
                'statistics/show' ,
                {
                  totalQuizes : totalQuizes ,
                  totalComments : totalComments ,
                  averageComments : totalComments / totalQuizes ,
                  c : c ,
                  errors : []
                }
              );
            }
          );
        }
      );
    }
  );
}
