export default (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        "Movie",
        {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            duration: {
                type: Sequelize.STRING,
                allowNull: false
            },
            genre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            poster: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );
}