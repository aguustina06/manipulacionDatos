const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })

            //hubo un error en la base de datos
            .cath(err => {
                res.send(err)
            })

    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, 
    
    
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD

    //creamos pelicula
    add: function (req, res) {
        // que hacer con add. renderizar la vista
        res.render('moviesAdd')  
    },

    create: function (req, res) {
        // info que nos llega del formulario
        //console.log(req.body)

        db.Movie.create(req.body)
        .then(result => {
            //res.send(result)
            res.redirect(`movies/detail/${result.id}`)//se va a la peli que creo
        })
        .cath(err => {
            res.send('error')
        })

        /*db.movies.create({
            title: req.body.title,
            rating: req.body.rating
        }*/
    },

    edit: function(req, res) {
        
        db.Movie.findByPk(+req.params.id)

        .then(Movie => {
        if(Movie) {
            //enviar la vista
            res.render('moviesEdit', {Movie})
        } else {
            res.send('mo existe la pelicula')
        }
    })
        //peticion a base de datos THEN
        /*.then(Movie => {
            res.send(Movie)
        })*/
        .cath(err => {
            res.render('error')
        })

    },

    update: function (req,res) {
        // 
        db.Movie.update(req.body, {
            where: {
                id:+req.params.id
            }
        })
            .then(result => {
                if(result[0] !== 0)//array en cero sera un false, no se hizo la modif
                {
                    res.send(res.redirect(`movies/detail/${+req.params.id}`))
                } else {
                    res.send('no se pudo modificar, porque no hay nada que modificar')
                }
                
                
            })

            .catch(err => {
                res.render('error')
            })
        
    },

    delete: function (req, res) {
        // IGUAL QUE EN EDIT PERO CON DELETE

        // /buscar peli que quieroeditar
        //var que accedo a la tabla= db
        db.Movie.findByPk(+req.params.id)//buscame la peli en la tabla(params) con ese id

        .then(Movie => {
        if(Movie) {
            //enviar la vista
            res.render('moviesDelete', {Movie})
        } else {
            res.send('mo existe la pelicula')
        }
    })
        //peticion a base de datos THEN
        /*.then(Movie => {
            res.send(Movie)
        })*/
        .catch(err => {
            res.render('error')
        })
    },

    destroy: function (req, res) {
        // 
        db.Movie.destroy({
            where: {id: +req.params.id}
        })

        .then(result => {
            res.send(`No existe ${result}`)
        })

        .catch(err => {
            res.render('error')
        })

    }

}

module.exports = moviesController;


