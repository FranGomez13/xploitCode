const express = require('express');
const router = express.Router();
const typeFile = require('../models/typeFile');
const file = require('../models/file');
const users = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res)=>{
	typeFile.find({"_id": ObjectId(req.body._idType)})
	.then(data=>{
		var f = new file({
			name: req.body.name,
			content: "",
			folder: {"_id": ObjectId(req.body._idParent), "name": req.body.parent},
			typeFile: data,
			privacy: "public",
			usersShared: [],
			favorite: false
		});
		f.save()
		.then(data=>{
	        res.send('<a onclick="return modalComplete()" class="btn btn-outline-purple form-control">Close</a>');
	    })
	    .catch(error=>{
	        res.send(error);
	    });
	})
	.catch(error=>{});
});

router.put('/:id', (req, res)=>{
	file.updateOne({"_id": ObjectId(req.params.id)},
	{$set:{content: req.body.content}})
	.then(data=>{
		res.send(data);
	})
	.catch(error=>{});
});

router.delete('/:id', (req, res)=>{
	file.deleteOne({"_id": ObjectId(req.params.id)})
	.then(data=>{
		res.send('File Delete<hr>');
	})
	.catch(error=>{});
});

router.get('/:id/download', (req, res)=>{
	file.find({"_id": ObjectId(req.params.id)})
	.then(file=>{
		var name = file[0].name + "." + file[0].typeFile[0].extension
		console.log(file[0].typeFile);
		console.log(name);
		res.contentType('text/plain');
		res.set({ "Content-Disposition": `attachment; filename=${name}`});
		res.send(file[0].content); 
	})
	.catch(error=>{});
});

router.get('/share', (req, res)=>{
	users.find({"_id":{$ne: ObjectId(req.session.passport.user._id)}})
	.then(users=>{
		res.render('pages/share',{
			users: users
		});
	})
	.catch(error=>{});
});

router.post('/:id/share', (req, res)=>{
	file.updateOne({"_id": ObjectId(req.params.id)},
		{$push:{
			"usersShared": {"_id": ObjectId(req.body._id), "name": req.body.name}
		}})
	.then(file=>{
		res.send('<a onclick="return closeConfirmModal()" class="btn btn-outline-purple form-control">Close</a>');
	})
	.catch(error=>{});
});

module.exports = router;