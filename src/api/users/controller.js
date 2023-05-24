const { StatusCodes } = require("http-status-codes")
const db = require("../../database/models")
const User = db.users
const JudgeDate = db.JudgeDate

const index = async (req, res, next) => {
  try {
    const { roles } = req.query

    let condition = {}

    if (roles) condition = { roles: roles }

    const result = await User.findAll({
      attributes: ["id", "name", "email", "phone", "roles"],
      where: condition,
    })
    return res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const find = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await User.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "roles",
        "timeZone",
        "country",
      ],
    })
    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }
    return res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    next(error)
  }
}

const judgeDate = async (req, res, next) => {
  try {
    const { id } = req.params
    const { date } = req.body

    const data = await JudgeDate.create({ userId: id, date })
    console.log(data)
    return res.status(StatusCodes.CREATED).json({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// const update = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const {
//       firstName,
//       lastName,
//       role,
//       group,
//       country,
//       timeZone,
//       email,
//       password,
//     } = req.body;
//     const checkingUser = await User.findOne({
//       where: { id },
//     });
//     console.log(password);
//     if (!checkingUser) throw new NotFoundError('User not found');
//     if (group) {
//       const result = await GroupModel.findAll({
//         where: { id: group.map((item) => item.value) },
//       });

//       if (result.length !== group.length)
//         throw new NotFoundError('Group not Valid');

//       const checkingForDelete = await db.groupUser.findAll({
//         where: { userId: id },
//       });
//       if (checkingForDelete) {
//         checkingForDelete.forEach(async (item) => {
//           if (!group.find((itemGroup) => itemGroup.value === item.groupId)) {
//             await db.groupUser.destroy({
//               where: {
//                 groupId: item.groupId,
//                 userId: id,
//               },
//             });
//           }
//         });
//       }

//       group.forEach(async (item) => {
//         const checkingGroupUser = await db.groupUser.findOne({
//           where: { groupId: item.value, userId: id },
//         });
//         if (!checkingGroupUser) {
//           const result = await db.groupUser.create({
//             groupId: item.value,
//             userId: id,
//           });
//         }
//       });
//     }

//     const updateValues = {
//       email,
//       firstName,
//       lastName,
//       role,
//       country,
//       timeZone,
//     };

//     if (password) {
//       updateValues.password = bcrypt.hashSync(password, 10);
//     }

//     const result = await User.update(updateValues, {
//       where: { id },
//     });

//     return res.status(StatusCodes.OK).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params

    const checking = await User.findOne({
      where: { id },
    })
    if (!checking) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
    }

    const result = await User.destroy({
      where: { id },
    })

    return res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    next(error)
  }
}

module.exports = { index, find, judgeDate, destroy }
