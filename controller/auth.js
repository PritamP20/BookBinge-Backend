const model = require("../model/user")
const User = model.User
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.key'), 'utf8')
const bcrypt = require('bcrypt')

// exports.signUp = async (res, req)=>{
//     const user = new User(req.body)
//     console.log(req.body)
//     // var token = jwt.sign({email: req.body.email}, privateKey, {algorithm: 'RS256'})
//     var token = jwt.sign({email: req.body.email}, privateKey,{algorithm: 'RS256'});

//     const hashPassword = bcrypt.hashSync(req.body.paassword, 10)
//     user.token = token
//     user.password= hashPassword
//     user.save()
//         .then((savedModel)=>{
//             res.status(201).json({token})
//         })
//         .catch((error)=>{
//             res.status(400).json({error})
//         })
// }

exports.login = async (req, res)=>{
    try {
        console.log(req.body)
        const doc = await User.findOne({email: req.body.email})
        console.log(doc)
        const authIn = bcrypt.compareSync(req.body.password, doc.password)
        console.log(authIn)
        if (authIn) {
            const token = jwt.sign({email: req.body.email}, privateKey, {algorithm: 'RS256'})
            doc.token = token;
            await doc.save()
            res.json({"token":token})
        }else{
            console.log(error)
            res.status(401).json({error})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({error})
    }

}

exports.signUp = async (req, res) => {
    const user = new User(req.body);
    // var token = jwt.sign({email: req.body.email}, process.env.SECRET,{algorithm: 'RS256'});
    var token = jwt.sign({email: req.body.email, name:req.body.name}, privateKey,{algorithm: 'RS256'});
  
    // const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    try {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        user.password = hashPassword;
    
        user.token = token;
        user
        .save()
        .then((savedModel) => {
            // console.log(savedModel)
            res.status(201).json({token});
        })
        .catch((error) => {
            res.status(400).json(error);
            console.log(error)
        });
    } catch (error) {
        console.log(error)
        res.status(401).json({"token":token})
        
    }
  };
  
//   exports.login = async (req, res) =>{
//     try {
//       const doc = await User.findOne({email: req.body.email});
//       // console.log(doc.password)
//       // console.log(req.body.password)
//       const isAuth = bcrypt.compareSync(req.body.password, doc.password); //it will be in true or false
//       // console.log(isAuth)
//       if (isAuth) {
//         const token = jwt.sign({email: req.body.email}, privateKey, {algorithm: 'RS256'})
//         doc.token = token;
//         doc.save(()=>{
//           res.json({token})
//         })
//       }else{
//         res.sendStatus(401)
//       }
  
//     } catch (error) {
//       res.status(400).json(error);
      
//     }
//   }