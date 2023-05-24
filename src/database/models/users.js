"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.JudgeDate, {
        foreignKey: "userId",
        as: "JudgeDate",
      })
      this.hasMany(models.entries, {
        foreignKey: "userId",
        as: "entris",
      })
    }
  }
  users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          len: {
            args: [0, 255],
            msg: "First name must be less than 255 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email is invalid",
          },
          unique: function (value, next) {
            const self = this
            users
              .findOne({ where: { email: value } })
              .then(function (user) {
                if (user && self.id !== user.id) {
                  return next("Email address already in use!")
                }
                return next()
              })
              .catch(function (err) {
                return next(err)
              })
          },
        },
      },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      roles: {
        type: DataTypes.ENUM("admin", "poc", "user", "judge"),
        allowNull: false,
        defaultValue: "user",
        enum: ["admin", "poc", "user", "judge"],
        validate: {
          notNull: {
            msg: "Role is required",
          },
          isIn: {
            args: [["admin", "poc", "user", "judge"]],
            msg: "Role must be admin, poc, judge or user",
          },
        },
      },
      timeZone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Time zone is required",
          },
          len: {
            args: [0, 255],
            msg: "Timezone must be less than 255 characters",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Country is required",
          },
          len: {
            args: [0, 255],
            msg: "Country at must be less than 255 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  )
  return users
}
