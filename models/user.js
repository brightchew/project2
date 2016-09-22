'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
            firstName: {
              type: DataTypes.STRING,
              validate: {
                len: {
                  args: [1,99],
                  msg: 'Name must be between 1-99'
                }
              }
            },
            lastName: {
              type: DataTypes.STRING,
              validate:{
                len: {
                  args: [1,99],
                  msg:'Name must be between 1 to 99'
                }
              }
            },
            email: {
              type: DataTypes.STRING,
              validate: {
              isEmail: {
                  msg: 'Invalid email address'
                }
              }
            },
            password: {
              type: DataTypes.STRING,
              validate: {
                len: {
                  args: [1,99],
                  msg: 'password must be between 8 to 99 characters'
                }
              }
            }
        }, {
            hooks: {
                beforeCreate: function(createdUser, options, cb) {
                    var hash = bcrypt.hashSync(createdUser.password, 10);
                    createdUser.password = hash;
                    cb(null, createdUser);
                },
                beforeUpdate: function(updatedUser, option,cb) {
                    if (updatedUser.changed('password') ) {

                      var hash = bcrypt.hashSync(updatedUser.password, 10);
                      updatedUser.password = hash;
                    }

                    cb(null, updatedUser);
                }
            },
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                }
            },
            instanceMethods: {
                validPassword: function(password) {
                    return bcrypt.compareSync(password, this.password);
                },
                toJSON: function() {
                    var jsonUser = this.get();
                    delete jsonUser.password;
                    return jsonUser;
                }
            }
        });
    return user;
};
