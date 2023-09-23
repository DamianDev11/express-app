const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

const findAll = async (res) => {
  let allRestaurant = await Restaurant.find({});
  return res.json(allRestaurant);
};

exports.getAll = (req, res) => {
  findAll(res);
};

exports.getRestaurant = async (req, res) => {
  let singleRestaurant = await Restaurant.find(req.params.id);
  return res.json(singleRestaurant);
};

exports.addRestaurant = (req, res) => {
  let restaurantToAdd = new Restaurant({ name: req.body.name });
  restaurantToAdd.save().then((rest) => {
    res.json({ message: "Adding successful", rest });
  });
};
