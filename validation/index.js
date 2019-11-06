exports.userSignupValidator = (req,res,next) => {

    // first name is not null and between 4-10 characters

    req.check("fname","First name is required").notEmpty();

    // last name is not null and between 4-10 characters
    req.check("lname","Last name is required").notEmpty();

    // //email is not null,valid and normalized
    // req.check("email","Email must be between 3 to 32 characters")
    // .matches(/.+\@.+\..+/)
    // .withMessage("Email must contain @")
    // .isLength({
    //     min: 4,
    //     max:2000
    // });

    //email is not null,valid and normalized
    req.check("email","Email is required").notEmpty();
    req.check("email")
    .isLength({min: 3})
    .withMessage("Email must contain at least 3 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @");



    //check for password
    req.check("password","Password is required").notEmpty();
    req.check('password')
    .isLength({min:6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");


    //check for errors
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError});
    }

    //proceed to next middleware

    next();


};