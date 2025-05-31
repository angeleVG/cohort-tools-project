const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

// CREATE cohort
router.post("/", (req, res) => {
  Cohort.create(req.body)
    .then(cohort => res.status(201).json(cohort))
    .catch(err => res.status(400).json({ error: err.message }));
});

// READ all cohorts
router.get("/", (req, res) => {
  Cohort.find()
    .then(cohorts => res.json(cohorts))
    .catch(err => res.status(500).json({ error: err.message }));
});

// READ one cohort by ID
router.get("/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then(cohort => cohort ? res.json(cohort) : res.status(404).json({ error: "Cohort not found" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// UPDATE cohort
router.put("/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then(updated => res.json(updated))
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE cohort
router.delete("/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
