'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    UserId:DataTypes.INTEGER,
    name: DataTypes.STRING,
    state: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    college: DataTypes.INTEGER,
    description: DataTypes.STRING,
    images: DataTypes.JSON,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
    Event.hasMany(models.Vote, {as: 'votes'})
    Event.hasMany(models.Comment, {as: 'comments'})


  };
  return Event;
};