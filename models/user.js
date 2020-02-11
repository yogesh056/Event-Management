'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    state: DataTypes.INTEGER,
    user_name:DataTypes.STRING,
    image:DataTypes.STRING,
    email: DataTypes.STRING,
    college: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    dob: DataTypes.DATEONLY
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Event, {as: 'events'})
    User.hasMany(models.Vote, {as: 'votes'})
    User.hasMany(models.Comment, {as: 'comment'})



  };
  return User;
};