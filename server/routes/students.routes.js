const router = require("express").Router();
const Student = require("../models/Student.model");
const errorHandler = "../middleware/errorHandler.js";

// READ students by cohort
router.get("/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => res.json(students))
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// CREATE student
router.post("/", (req, res, next) => {
  Student.create(req.body)
    .then((student) => res.status(201).json(student))
    // .catch(err => res.status(400).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// READ all students
router.get("/", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((students) => res.json(students))
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// READ one student by ID
router.get("/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) =>
      student
        ? res.json(student)
        : res.status(404).json({ error: "Student not found" })
    )
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// UPDATE student
router.put("/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updated) => res.json(updated))
    // .catch(err => res.status(400).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// DELETE student
router.delete("/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => res.status(204).send())
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
