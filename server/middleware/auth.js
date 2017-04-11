export function authenticate(req, res, next){
    //need to do authenticaiton
    console.log(' auth middleware called')
    next();
};

export function checkRole (role) {
    return (req, res, next) => {
        if(req.query.role == role){
            console.log('role accessing works');
            next();            
        }else{
            res.status(403);
            next(new Error("access denied"))
        }
    };
};