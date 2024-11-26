const Movie = require("../models/Movie");
const {errorHandler} = require("../auth");
const User = require("../models/User");


module.exports.addMovie = async (req,res) => {

 try {
        // Extract userId from the authenticated user
        const userId = req.user.id;

         // Fetch user details to validate admin status
        const user = await User.findById(userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({
                message: 'Access denied. Admin privileges are required.',
            });
        }

        // Extract movie details from the request body
        const { title , director, year, description, genre } = req.body;

        // Validate required fields
        if (!title || !director || !year || !description || !genre) {
            return res.status(400).json({
                message: 'All fields are required.',
            });
        }

        // Create a new movie instance
        const newMovie = new Movie({
            title,
            director,
            year,
            description,
            genre
        });

        // Save the workout to the database
        const savedMovie = await newMovie.save();

        // Respond with the saved movie
        res.status(201).json(savedMovie);
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: 'Error adding movie.',
            error: error.message,
        });
    }
};


module.exports.getMovies = async (req, res) => {

     try {
        // Get the authenticated user's ID
        const userId = req.user.id;

        // Find workouts associated with the user ID
        const workouts = await Workout.find({ userId });

        // Check if no workouts were found
        if (workouts.length === 0) {
            return res.status(200).json({
                message: 'No workouts found.',
                workouts: [],
            });
        }

        // Respond with the list of workouts
        res.status(200).json({
            workouts: 
            workouts,
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: 'Error retrieving workouts.',
            error: error.message,
        });
    }

};




module.exports.updateWorkout = async (req, res)=>{

    try {
        const { workoutId } = req.params; // Extract workout ID from route parameters
        const { name, duration, status } = req.body; // Extract fields to update from the request body
        const userId = req.user.id; // Get the authenticated user's ID from the request

        // Validate that at least one field is provided for the update
        if (!name && !duration && !status) {
            return res.status(400).json({
                message: 'At least one field (name, duration, or status) is required to update the workout.',
            });
        }

        // Find the workout by ID and ensure it belongs to the authenticated user
        const workout = await Workout.findOne({ _id: workoutId, userId });
        if (!workout) {
            return res.status(404).json({
                message: 'Workout not found or you do not have permission to update this workout.',
            });
        }

        // Update the workout with the provided fields
        if (name) workout.name = name;
        if (duration) workout.duration = duration;
        if (status) workout.status = status;

        // Save the updated workout
        const updatedWorkout = await workout.save();

        // Respond with the updated workout
        res.status(200).json({
            message: 'Workout updated successfully.',
            updatedWorkout: updatedWorkout,
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: 'Error updating workout.',
            error: error.message,
        });
    }
};


module.exports.deleteWorkout = async (req, res) => {
  
       try {
        const { workoutId } = req.params; // Extract workout ID from route parameters
        const userId = req.user.id; // Get the authenticated user's ID from the request

        // Find the workout by ID and ensure it belongs to the authenticated user
        const workout = await Workout.findOne({ _id: workoutId, userId });
        if (!workout) {
            return res.status(404).json({
                message: 'Workout not found or you do not have permission to delete this workout.',
            });
        }

        // Delete the workout
        await workout.deleteOne();

        // Respond with success message
        res.status(200).json({
            message: 'Workout deleted successfully.',
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: 'Error deleting workout.',
            error: error.message,
        });
    }

};



module.exports.completeWorkoutStatus = async (req, res) => {
  
     try {
        const { workoutId } = req.params; // Extract workout ID from route parameters
        const userId = req.user.id; // Get the authenticated user's ID from the request

        // Find the workout by ID and ensure it belongs to the authenticated user
        const workout = await Workout.findOne({ _id: workoutId, userId });
        if (!workout) {
            return res.status(404).json({
                message: 'Workout not found or you do not have permission to update this workout.',
            });
        }

        // Update the status of the workout to 'Completed'
        workout.status = 'completed';

        // Save the updated workout
        const updatedWorkout = await workout.save();

        // Respond with the updated workout
        res.status(200).json({
            message: 'Workout status updated successfully.',
            updatedWorkout: updatedWorkout,
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: 'Error updating workout status.',
            error: error.message,
        });
    }
};
