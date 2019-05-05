const express = require('express');
const router = express.Router();
const project = require("../models/project");
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res)=>{
	var p = new project({
		name: req.body.name,
		html: "",
		js: "",
		css: "",
		user: {"_id": ObjectId(req.session.passport.user._id), "name": req.session.passport.user.name},
		privacy: "public",
		usersShared: [],
		favorite: false
	});
	p.save()
	.then(data=>{
        res.send('<a onclick="return modalComplete()" class="btn btn-outline-purple form-control">Close</a>');
    })
    .catch(error=>{
        res.send(error);
    });
});

router.delete('/:id', (req, res)=>{
	project.deleteOne({"_id": ObjectId(req.params.id)})
	.then(data=>{
		res.send(
			`<button onclick="closeConfirmDelete()" type="button" class="btn btn-outline-purple form-control">
				Close
			</button>`
		);
	})
	.catch(error=>{});
});

module.exports = router;