const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const validator = require('validator');

const storage = multer.diskStorage({destination:(req,file,cb)=>cb(null,path.join(__dirname,'..','uploads','avatars')),filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))});
const upload = multer({storage});

router.post('/register', upload.single('avatar'), async (req,res)=>{
  try{
    const {name,email,password,phone,cpf} = req.body;
    if(!name||!email||!password) return res.status(400).json({message:'Campos obrigatórios faltando'});
    if(!validator.isEmail(email)) return res.status(400).json({message:'Email inválido'});
    const cpfClean = cpf?cpf.replace(/\D/g,'') : '';
    if(cpf && cpfClean.length!==11) return res.status(400).json({message:'CPF inválido'});
    const existing = await User.findOne({email}); if(existing) return res.status(400).json({message:'Email já cadastrado'});
    const hash = await bcrypt.hash(password,10);
    const userData = {name,email,password:hash,phone,cpf:cpfClean};
    if(req.file) userData.avatar=`/uploads/avatars/${req.file.filename}`;
    const user = new User(userData); await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'});
    res.json({token,user:{id:user._id,name:user.name,email:user.email,avatar:user.avatar}});
  }catch(e){console.error(e);res.status(500).json({message:'Erro'});}
});

router.post('/login', async (req,res)=>{
  try{ const {email,password}=req.body; if(!email||!password) return res.status(400).json({message:'Campos faltando'});
    const user = await User.findOne({email}); if(!user) return res.status(400).json({message:'Credenciais inválidas'});
    const ok = await bcrypt.compare(password,user.password); if(!ok) return res.status(400).json({message:'Credenciais inválidas'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'secret',{expiresIn:'7d'});
    res.json({token,user:{id:user._id,name:user.name,email:user.email,avatar:user.avatar}});
  }catch(e){res.status(500).json({message:'Erro'});} });

module.exports = router;
