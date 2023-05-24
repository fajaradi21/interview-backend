"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class entries extends Model {
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
  entries.init(
    {
      project: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Project name is required",
          },
        },
      },
      season: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Year season is required",
          },
        },
      },
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
      parentCategory: {
        type: DataTypes.ENUM(
          "AI Impact Creator",
          "AI Impact Shaper",
          "Best Practices for AI Skilling"
        ),
      },
      category: {
        type: DataTypes.ENUM(
          "13 - 18 Years",
          "Above 18 Years",
          "Academic Institutions",
          "Goverment Partners",
          "Implementation Partners"
        ),
      },
    },
    {
      sequelize,
      modelName: "entries",
    }
  )
  return entries
}
