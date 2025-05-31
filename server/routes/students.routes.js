const router = require("express").Router();
const Student = require("../models/Student.model");

// READ students by cohort
router.get("/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then(students => res.json(students))
    .catch(err => res.status(500).json({ error: err.message }));
});

// CREATE student
router.post("/", (req, res) => {
  Student.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(err => res.status(400).json({ error: err.message }));
});

// READ all students
router.get("/", (req, res) => {
  Student.find()
.populate("cohort") 
    .then(students => res.json(students))
    .catch(err => res.status(500).json({ error: err.message }));
});

// READ one student by ID
router.get("/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then(student => student ? res.json(student) : res.status(404).json({ error: "Student not found" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// UPDATE student
router.put("/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then(updated => res.json(updated))
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE student
router.delete("/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
