const router = require("express").Router();
const Cohort = require("../models/Cohort.model");
const errorHandler = "../middleware/errorHandler.js";

// CREATE cohort
router.post("/", (req, res, next) => {
  Cohort.create(req.body)
    .then((cohort) => res.status(201).json(cohort))
    // .catch(err => res.status(400).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// READ all cohorts
router.get("/", (req, res, next) => {
  Cohort.find()
    .then((cohorts) => res.json(cohorts))
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// READ one cohort by ID
router.get("/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) =>
      cohort
        ? res.json(cohort)
        : res.status(404).json({ error: "Cohort not found" })
    )
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// UPDATE cohort
router.put("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updated) => res.json(updated))
    // .catch(err => res.status(400).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

// DELETE cohort
router.delete("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => res.status(204).send())
    // .catch(err => res.status(500).json({ error: err.message }));
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
