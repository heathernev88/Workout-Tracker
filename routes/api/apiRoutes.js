const router = require("express").Router();
const Workout = require("../../models/workoutSchema.js");


router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.update(
        {
            _id: params.id
        },
        {
            $push: {
                exercises: body
            },

            $inc: {
                duration: body.duration
            }
        },

        (err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(data);
            }
        })

});

router.get("/api/workouts/range", (_, res) => {
    let lowerRange = new Date();
    lowerRange.setDate(lowerRange.getDate() - 7);

    Workout.find({})
        .where("day").gte(lowerRange)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;