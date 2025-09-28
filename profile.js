const express = require('express'); const router = express.Router(); const auth = require('../middleware/auth'); const multer = require('multer'); const path = require('path'); const User = require('../models/User');
const storage = multer.diskStorage({destination:(req,file,cb)=>cb(null,path.join(__dirname,'..','uploads','avatars')), filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))});
const upload = multer({storage});
router.get('/', auth, async (req,res)=>{ const user = req.user; res.json({id:user._id,name:user.name,email:user.email,phone:user.phone,cpf:user.cpf,avatar:user.avatar,progress:user.progress}); });
router.put('/', auth, upload.single('avatar'), async (req,res)=>{ try{ const {name,phone,cpf} = req.body; const user = req.user; if(name) user.name = name; if(phone) user.phone = phone.replace(/\D/g,''); if(cpf) user.cpf = cpf.replace(/\D/g,''); if(req.file) user.avatar = `/uploads/avatars/${req.file.filename}`; await user.save(); res.json({message:'Perfil atualizado', user}); }catch(e){res.status(500).json({message:'Erro'});} });
module.exports = router;
