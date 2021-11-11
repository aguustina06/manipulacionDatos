module.exports = (sequelize, dataTypes) => {


    let alias = 'Movie'; //alias que uso en el servidor!!!! YO LO VOY A MANEJAR ASI (lo pongo en create)


    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true //ya pone el numero que sigue, lo hace solo
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    };
    let config = {


        tableName: 'movies', //en la base dedatos se llama asi!!!!!! SE LLAMA ASI LA TABLA


        timestamps: false
    };
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}