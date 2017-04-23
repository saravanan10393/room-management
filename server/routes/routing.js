import User from '../controller/user';

/**
 * Routes describes route to be match with request
 * Route can be a object 
 * {
 *  method , 
 *  url,  
 *  ?auth: {open, secure(default)}, 
 *  ?section : "admin if this is url is allowed only for admin"
 *  ?middlewares:[], 
 *  action : function req-handler
 * }
 */
const userRoutes = [
    {method : "post", url: "/signup", auth: "open", action: User.create},
    {method : "post", url: "/signin", auth: "open", action: User.signin},
    {method : "post", url: "/forgotPassword", auth: "open", action: User.forgotPassword},
    {method : "post", url: "/verifyotp", auth: "open", action: User.verifyOTP},
    {method : "post", url: "/resetPassword", auth: "open", action: User.resetPassword},
    {method : "post", url: "/update", action: User.update}
];

/**
 * Route mapper
 * {
 *  basePath : "/" default,
 *  routes // routes to map controllers
 *  ?middlewares[]:function(req,res,next) // base router level middleware
 * }
 */
const userRoutesMap = {
    basePath : "user",
    routes : userRoutes
};



export { userRoutesMap };
// do the same for other routing
