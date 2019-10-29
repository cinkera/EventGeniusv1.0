const Joi = require('joi');


module.exports = {
    /*  Register JOI validation
    *   Password Must At least have 
        - one uppercase letter
        - one lowercase letter
        - one numeric value
        - one special character,
        and must be more than 6 characters long.
    */
    register (req, res, next) {
        console.log("\n ... register function in RegisterPolicy.js");
        const schema = {
            username: Joi.string(),
            firstname: Joi.string(),
            lastname: Joi.string(),
            birthday: Joi.string(),
            email : Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$')
            )
        }

        const {error, value} = Joi.validate(req.body, schema)

        if(error){
            console.log("\n ... Error in Joi, error: ", error);
            console.log("\n ...key: ", error.details[0].context.key);
            switch (error.details[0].context.key) {

                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break;

                case 'password':
                    res.status(400).send({
                        error: `Passwords must have at least:
                        <br>
                        - one uppercase letter<br>
                        - one lowercase letter<br>
                        - one numeric value<br>
                        - one special character,<br>
                        and must be between 6 and 32 characters long. <br>
                        <br>
                        These parameters help ensure your password keep your information as safe as possible!`
                    })    
                    break;
                
                case'birthday':
                    res.status(400).send({error: 'Birthday Is not Allowed to Be Empty'});
                    break;

                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })                
            }
        } else {
            console.log("\n ... passed Joi Validation");
            next()
        }
    }


}
