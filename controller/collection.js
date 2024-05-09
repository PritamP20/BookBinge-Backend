const express = require('express')
const model = require('../model/collections')
const Collections = model.Collection

exports.createCollection = async (req, res)=>{
    console.log(req.body)
    const collection = new Collections(req.body);
    console.log(collection)
    await collection.save()
        .then((saved)=>{
            res.status(201).json(saved)
        })
        .catch((err)=>{
            res.status(201).json(err)
        })

}

exports.getAllCollection = async (req, res)=>{
    const data = await Collections.find()
    res.status(201).json(data)
}

exports.getCollectionById = async (req, res)=>{
    const id = req.params.id;
    const data = await Collections.findOne({'id':id})
    res.status(201).json(data)
}
 
exports.replaceCollection = async (req, res)=>{
    try {
        const id = req.params.id;
        const doc = await Collections.findOneAndReplace({_id:id},req.body, {new:true})
        console.log(req.body)
        res.status(201).json(doc)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}