const express = require('express');
const router = express.Router();
const folder = require("../models/folder");
const typeFile = require("../models/typeFile");
const ObjectId = require('mongoose').Types.ObjectId;

router.get("/",function(req, res){
    res.render('pages/new/index');
});

router.get("/file",function(req, res){
    folder.find({"user._id": ObjectId(req.query._id)})
    .then(data=>{
    	typeFile.find()
    	.then(file=>{
    		res.render('pages/new/file',{
        		data: data,
        		file: file
        	});
		})
	    .catch(error=>{
	        res.send(error);
	    });
    })
    .catch(error=>{
        res.send(error);
    });
});

router.get("/folder",function(req, res){
    folder.find({"user._id": ObjectId(req.query._id)})
    .then(data=>{
        res.render('pages/new/folder',{
        	data: data
        });
    })
    .catch(error=>{
        res.send(error);
    });
});

router.get("/project",function(req, res){
    res.render('pages/new/project');
});

module.exports = router;