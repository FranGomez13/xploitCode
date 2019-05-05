const express = require('express');
const router = express.Router();
const folder = require("../models/folder");
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res)=>{
	var f = new folder({
		name: req.body.name,
		parent: {"_id": ObjectId(req.body._id), "name": req.body.parent},
		user: {"_id": ObjectId(req.session.passport.user._id), "name": req.session.passport.user.name},
		privacy: "public",
		usersShared: []
	});
	f.save()
	.then(data=>{
        res.send('<a onclick="return modalComplete()" class="btn btn-outline-purple form-control">Close</a>');
    })
    .catch(error=>{
        res.send(error);
    });
});

module.exports = router;