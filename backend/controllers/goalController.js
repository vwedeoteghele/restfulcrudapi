const asyncHandler = require("express-async-handler");
const { findById } = require("../models/goalModel");
const Goals = require("../models/goalModel")

const getGoals = asyncHandler(async(req, res) => {
  const goals = await Goals.find();
  res.status(200).json(goals);

})
const setGoal = asyncHandler(async(req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error("Please add a text field")
  }

  const goal = await Goals.create({
    text: req.body.text
  })
  res.status(200).json(goal);

})
const updateGoal = asyncHandler(async(req, res) => {

const getGoalToUpdate = await Goals.findById(req.params.id)

if(!getGoalToUpdate) {
  res.status(400)
  throw new Error("goal not found")
}

const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, {
  text: req.body.text
}, {
  new: true
})

  res.status(200).json(updatedGoal);

})
const deleteGoal = asyncHandler(async(req, res) => {

  const getGoal = await Goals.findById(req.params.id);

  if(!getGoal) {
    res.status(400)
    throw new Error("goal does not exist")
  }

const deletedGoal = await Goals.findByIdAndDelete(req.params.id)
console.log(deletedGoal);
  res.status(200).json(deleteGoal);

})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}