'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'combiblinds',
      'imgFileLocation',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('combiblinds', 'imgFileLocation');
  }
};
