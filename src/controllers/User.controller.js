const catchError=require('../utils/catchError')
const User=require('../models/User')

// Create

const create=catchError(async(req, res)=> {
    const result=await User.create(req.body)
    return res.status(201).json(result)
})

// Read - finders

const getAll=catchError(async(req, res)=> {
    const result=await User.findAll()
    return res.json(result)
})
const getOne=catchError(async(req, res)=> {
    const {id}=req.params
    const result=await User.findByPk(id)
    return res.json(result)
})

// Update

const update=catchError(async(req, res)=> {
    const {id}=req.params
    const result=await User.update(
        {...req.body},
        {where: {id}, returning: true}
    )
    if(!result[0][1]) return res.send("User not found")
    return res.status(200).json(result)
})

// Delete

const destroy=catchError(async(req, res)=> {
    const {id}=req.params
    await User.destroy({where: {id}})
    return res.send("User deleted").sendStatus(204)
})

module.exports={
    create,
    getAll,
    getOne,
    update,
    destroy
}