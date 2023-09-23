const Review = require("../models/review");

const findAll = async (res) => {
  let allReviews = await Review.find({});
  return res.json(allReviews);
};

exports.getAll = (req, res) => {
  findAll(res);
};

exports.getReviewsByRestaurant = async (req, res) => {
  let allReviews = await Review.find({ resID: req.params.id });
  return res.json(allReviews);
};

exports.addReview = (req, res) => {
  const { resID, userID, rating, description } = req.body;

  let newReview = new Review({
    resID,
    userID,
    rating,
    description,
    date: new Date(),
  });

  newReview.save().then((rest) => {
    res.json({ message: "Review added successfully!", rest });
  });
};
