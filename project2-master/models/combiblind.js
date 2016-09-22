'use strict';
module.exports = function(sequelize, DataTypes) {
  var combiblind = sequelize.define('combiblind', {
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT,
    maxWidth: DataTypes.FLOAT,
    imgFileLocation:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return combiblind;
};