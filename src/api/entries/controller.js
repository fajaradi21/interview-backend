const { StatusCodes } = require("http-status-codes")
const db = require("../../database/models")

const Entries = db.entries

const index = async (req, res, next) => {
  try {
    const result = await Entries.findAll({
      attributes: [
        "id",
        "project",
        "season",
        "userId",
        "parentCategory",
        "category",
      ],
    })
    return res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { project, season, userId, parentCategory, category } = req.body
    const data = await Entries.create({
      project: project,
      season: season,
      userId: userId,
      parentCategory: parentCategory,
      category: category,
    })
    return res.status(StatusCodes.CREATED).json({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const find = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Entries.findOne({
      where: { id },
      attributes: [
        "id",
        "project",
        "season",
        "userId",
        "parentCategory",
        "category",
      ],
    })
    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Entry not found" })
    }
    return res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    next(error)
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params

    const checking = await Entries.findOne({
      where: { id },
    })
    if (!checking) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Entry not found" })
    }

    const result = await Entries.destroy({
      where: { id },
    })

    return res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    next(error)
  }
}

module.exports = { index, create, find, destroy }
