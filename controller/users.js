const model = require('../model/user');
const User = model.User


exports.getUser= async(req, res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(201).json(error)
    }
}

exports.getUserByMail = async (req, res)=>{
    try {
        const userData = await User.findOne({email: req.body.email})
        res.status(201).json(userData)
    } catch (error) {
        console.log(error)
        res.status(201).json(error)
    }
}

exports.replaceUser = async (res, req)=>{
    try {
        const doc = await User.findOneAndReplace({email: req.body.email}, req.body, {new: true})
        res.status(201).json(doc)
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

exports.updateUser = async (res, req)=>{
    try {
        const doc = await User.findOneAndUpdate({email: req.body.email},{$set: req.body}, {new:true})
        res.status(201).json({doc})
    } catch (error) {
        res.status(401).json({error})
    }
}

exports.deleteUser = async (res, req)=>{
    try {
        const doc = User.findOneAndDelete({email: req.body.email})
        res.status(201).json({doc})
    } catch (error) {
        res.status(201).json({error})
    }   
}


