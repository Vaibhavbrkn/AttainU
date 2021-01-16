const {check , validationResult} = require('express-validator')

exports.userSignupValidator = [
    check('username').
    not()
    .isEmpty()
    .withMessage('username is required'),
    check('password')
    .isLength({min:8})
    .withMessage('Password must be at least 8 charcters long')
        
];

exports.userSigninValidator = [
    check('username').
    not()
    .isEmpty()
    .withMessage('username is required'),
    check('password')
    .isLength({min:8})
    .withMessage('Password must be at least 8 charcters long')
        
];

exports.runValidation = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({error:errors.array()[0].msg});
        }
        next();
    }