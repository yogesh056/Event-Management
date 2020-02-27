'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define('Answers', {
    UserId:DataTypes.INTEGER,
    QuestionId:DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Answers.associate = function(models) {
    // associations can be defined here 
    Answers.belongsTo(models.Questions, {foreignKey: 'QuestionId', as: 'questions'})
    Answers.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
    
  };
  return Answers;
};