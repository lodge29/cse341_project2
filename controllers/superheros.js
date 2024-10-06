const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllSuperheros = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('superheros').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// GET single user via id
const getSingleSuperhero = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('superheros').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// CREATE SINGLE USER
const createSuperhero = async (req, res) => {
    const user = {
        name: req.body.name,
        age:req.body.age,
        power:req.body.power,
        email:req.body.email,
        favoriteColor:req.body.favoriteColor,
        favoriteSport:req.body.favoriteSport,
        birthday:req.body.birthday

    };
    const response = await mongodb.getDatabase().db().collection('superheros').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Some error occured while updating the user');
    }
};

// UPDATE SINGLE USER
const updateSuperhero = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        age:req.body.age,
        power:req.body.power,
        email:req.body.email,
        favoriteColor:req.body.favoriteColor,
        favoriteSport:req.body.favoriteSport,
        birthday:req.body.birthday

    };
    const response = await mongodb.getDatabase().db().collection('superheros').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Some error occured while updating the user');
    }
};

// DELETE SINGLE USER
const deleteSuperhero = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('superheros').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Some error occured while updating the user');
    }
};

// EXPORT for use
module.exports = {
    getAllSuperheros,
    getSingleSuperhero,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero
};