module.exports = app => {
  const Tasks = app.db.models.Tasks

  app.route('/tasks')
    .get((req, res) => {
      // '/tasks': List tasks
      Tasks.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .post((req, res) => {
      // '/tasks': Save new task
      console.log(req.body)
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })

  app.route('/tasks/:id')
    .get((req, res) => {
      // '/tasks/1': Find a task
      Tasks.findOne({where: req.params})
        .then(result => {
          if (result)
            res.json(result)
          else
            res.sendStatus(404)
        })
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .put((req, res) => {
      // '/tasks/1': Update a task
      Tasks.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .delete((req, res) => {
      // '/tasks/1': Delete a task
      Tasks.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
}
