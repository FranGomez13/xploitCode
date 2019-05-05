const express = require('express');
const router = express.Router();
const folder = require('../models/folder');
const file = require('../models/file');
const user = require('../models/user');
const typeAccount = require('../models/typeAccount');
const project = require('../models/project');
const ObjectId = require('mongoose').Types.ObjectId;
const mw = require('../middlewares/auth-middleware');

router.get('/', mw.notLogin, (req, res) => {
    folder.find({$and: [
        {"user._id": ObjectId(req.session.passport.user._id)},
        {"name": "main"}
    ]})
    .then(f=>{
        folder.find({"parent._id": ObjectId(f[0]._id)})
        .then(f2=>{
            file.find({"folder._id": ObjectId(f[0]._id)})
            .then(f3=>{
                res.render('pages/user', {
                    avatar: req.session.passport.user.avatar,
                    nombre: req.session.passport.user.name,
                    userId: req.session.passport.user._id,
                    parentId: f[0]._id,
                    name: f[0].name,
                    folders: f2,
                    files: f3
                });
            })
            .catch(error=>{});
        })
        .catch(error=>{});
    })
    .catch(error=>{});
});

router.get('/:id', (req, res)=>{
    typeAccount.find().then(data=>{
        res.render('pages/profile',{
            nombre: req.session.passport.user.name,
            userId: req.session.passport.user._id,
            type: data
        })
    }).catch(error=>{});
});

router.put('/:id', (req, res)=>{
    user.updateOne(
        {"_id": ObjectId(req.session.passport.user._id)},
        {$set:
            {
                "name": req.body.name,
                "plan": req.body.plan
            }
        }
    )
    .then(data=>{res.send('hola');})
    .catch(err=>{})
});

router.get('/:id/folders', (req, res)=>{
	folder.find({"user._id": ObjectId(req.params.id)})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.get('/folder/:id', (req, res)=>{
    folder.find({"parent._id": ObjectId(req.params.id)})
    .then(folder=>{
        file.find({"folder._id": ObjectId(req.params.id)})
        .then(file=>{
            searchCurrentFolder(req, res, 'get', folder, file);
        })
        .catch(error=>{});
    })
    .catch(error=>{});
});

router.post('/folder/:id', (req, res)=>{
	folder.find({"parent._id": ObjectId(req.params.id)})
    .then(folder=>{
        file.find({"folder._id": ObjectId(req.params.id)})
        .then(file=>{
            searchCurrentFolder(req, res, 'post', folder, file);
        })
        .catch(error=>{});
    })
    .catch(error=>{});
});

function searchCurrentFolder(req, res, method, folders, files){
    folder.find({"_id": ObjectId(req.params.id)})
    .then(current=>{
        if (method === 'post')
            res.send({"folder": folders, "file":files, "current":current});
        if (method === 'get'){
            res.render('pages/user', {
                avatar: req.session.passport.user.avatar,
                nombre: req.session.passport.user.name,
                userId: req.session.passport.user._id,
                parentId: (current[0].name === 'main' ? current[0]._id : current[0].parent._id),
                parentName: (current[0].name === 'main' ? 0 : current[0].parent.name),
                name: current[0].name,
                folders: folders,
                files: files
            });
        }
    })
    .catch(error=>{});
}

router.get('/projects', mw.notLogin, (req, res)=>{
    project.find({"user._id": ObjectId(req.session.passport.user._id)})
    .then(data=>{
        res.render('pages/user', {
            avatar: req.session.passport.user.avatar,
            nombre: req.session.passport.user.name,
            userId: req.session.passport.user._id,
            parentId: "",
            parentName: "",
            name: "projects",
            folders: data,
            files: []
        });
    })
    .catch(error=>{
        res.send(error);
    });
});

router.post('/projects', (req, res)=>{
    project.find({"user._id": ObjectId(req.session.passport.user._id)})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.get('/file/:id', (req, res)=>{
    file.find({"_id": ObjectId(req.params.id)})
    .then(data=>{
        res.render('pages/fileEdit', {
            file: data
        })
    })
    .catch(error=>{});
});

router.get('/sharedwithme', mw.notLogin, (req, res)=>{
    file.find({"usersShared":{$elemMatch:{"_id": ObjectId(req.session.passport.user._id)}}})
    .then(files=>{
        res.render('pages/user', {
            avatar: req.session.passport.user.avatar,
            nombre: req.session.passport.user.name,
            userId: req.session.passport.user._id,
            parentId: "",
            parentName: "",
            name: "shared with me",
            folders: files,
            files: []
        });
    })
    .catch(error=>{});
});

router.post('/sharedwithme', (req, res)=>{
    file.find({"usersShared":{$elemMatch:{"_id": ObjectId(req.session.passport.user._id)}}})
    .then(files=>{
        res.send(files);
    })
    .catch(error=>{});
});

//ROUTER ANOTHER USER
router.get('/:id', mw.notLogin, (req, res) => {
    folder.find({$and: [
        {"user._id": ObjectId(req.params.id)},
        {"name": "main"}
    ]})
    .then(f=>{
        folder.find({"parent._id": ObjectId(f[0]._id)})
        .then(f2=>{
            file.find({"folder._id": ObjectId(f[0]._id)})
            .then(f3=>{
                res.render('pages/user', {
                    avatar: req.session.passport.user.avatar,
                    nombre: req.session.passport.user.name,
                    userId: req.session.passport.user._id,
                    parentId: f[0]._id,
                    name: f[0].name,
                    folders: f2,
                    files: f3
                });
            })
            .catch(error=>{});
        })
        .catch(error=>{});
    })
    .catch(error=>{});
});
module.exports = router;