module.exports = app => {
  const Tasks = app.db.models.Tasks

  app.route('/tasks')
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks List the user's tasks
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *   {"Authorization": "JWT abc.xyz.123.hgf"}
     * @apiSuccess {Object[]} tasks Task list
     * @apiSuccess {Number} tasks.id Task id
     * @apiSuccess {String} tasks.title Task title
     * @apiSuccess {Boolean} tasks.done Is task done?
     * @apiSuccess {Date} tasks.created_at Register's date
     * @apiSuccess {Date} tasks.updated_at Update's date
     * @apiSuccess {Number} tasks.user_id User's id
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 OK
     *   [{
     *     "id": 1,
     *     "title": "Study",
     *     "done": false,
     *     "created_at": "2016-02-10T12:20:11.700Z",
     *     "updated_at": "2016-02-10T12:20:11.700Z",
     *     "user_id": 1
     *   }]
     * @apiErrorExample {json} List error
     *   HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Tasks.findAll({
        where: { user_id: req.user.id }
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    /**
     * @api {post} /tasks Register a new task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *   {"Authorization": "JWT abc.xyz.123.hgf"}
     * @apiParam {String} title Task title
     * @apiParamExample {json} Input
     *   {"title": "Study"}
     * @apiSuccess {Number} id Task id
     * @apiSuccess {String} title Task title
     * @apiSuccess {Boolean} done=false Is task done?
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccess {Date} updated_at Update's date
     * @apiSuccess {Number} user_id User id
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 OK
     *   {
     *     "id": 1,
     *     "title": "Study",
     *     "done": false,
     *     "created_at": "2016-02-10T12:20:11.700Z",
     *     "updated_at": "2016-02-10T12:20:11.700Z",
     *     "user_id": 1
     *   }
     * @apiErrorExample {json} Register error
     *   HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      req.body.user_id = req.user.id
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })

  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks/:id Get a task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *   {"Authorization": "JWT abc.xyz.123.hgf"}
     * @apiParam {id} id Task id
     * @apiSuccess {Number} id Task id
     * @apiSuccess {String} title Task title
     * @apiSuccess {Boolean} done=false Is task done?
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccess {Date} updated_at Update's date
     * @apiSuccess {Number} user_id User id
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 OK
     *   {
     *     "id": 1,
     *     "title": "Study",
     *     "done": false,
     *     "created_at": "2016-02-10T12:20:11.700Z",
     *     "updated_at": "2016-02-10T12:20:11.700Z",
     *     "user_id": 1
     *   }
     * @apiErrorExample {json} Task not found error
     *   HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *   HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Tasks.findOne({
          where: {
            id: req.params.id,
            user_id: req.user.id
          }
        })
        .then(result => {
          if (result)
            return res.json(result)
          return res.sendStatus(404)
        })
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    /**
     * @api {put} /tasks/:id Update a task
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *   {"Authorization": "JWT abc.xyz.123.hgf"}
     * @apiParam {id} id Task id
     * @apiParam {String} title Task title
     * @apiParam {Boolean} done Is task done?
     * @apiParamExample {json} Input
     *   {
     *     "title": "Work",
     *     "done": true
     *   }
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 204 No Content
     * @apiErrorExample {json} Update error
     *   HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Tasks.update(req.body, {
          where: {
            id: req.params.id,
            user_id: req.user.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    /**
     * @api {delete} /tasks/:id
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *   {"Authorization": "JWT abc.xyz.123.hgf"}
     * @apiParam {id} id Task id
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 204 No Content
     * @apiErrorExample {json} Delete error
     *   HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Tasks.destroy({
          where: {
            id: req.params.id,
            user_id: req.user.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
}
