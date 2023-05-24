"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class JudgeDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "userId",
        as: "user",
      })
    }
  }
  JudgeDate.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
        validate: {
          notNull: {
            msg: "User id is required",
          },
          checkUserExist: async function (value, next) {
            try {
              const userExist = await sequelize.models.users
                .findOne({
                  where: {
                    id: value,
                  },
                })
                .then((data) => {
                  if (!data) {
                    next("Users not found")
                  } else {
                    next()
                  }
                })
            } catch (error) {
              next(error)
            }
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date is required",
          },
          isDate: {
            msg: "Date is not valid",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "JudgeDate",
    }
  )
  return JudgeDate
}
