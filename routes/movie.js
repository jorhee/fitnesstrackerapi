const express = require("express");
const movieController = require("../controllers/movie");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

const router = express.Router();



router.post("/addMovie", verify, movieController.addMovie);

router.get("/getMovies", verify, movieController.getMovies);


router.patch("/updateWorkout/:workoutId", verify, movieController.updateWorkout);

router.delete("/deleteWorkout/:workoutId", verify, movieController.deleteWorkout);

router.patch("/completeWorkoutStatus/:workoutId", verify, movieController.completeWorkoutStatus);


module.exports = router;