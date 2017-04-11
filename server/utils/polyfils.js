// (function(){
//     if(!Object.toArray){
//         Object.defineProperty(Object.prototype,"toArray" , {
//             enumerable : false,
//             value: () => {
//                 if(!this)
//                     return;
//                 return Object.keys(this).map( (key) => this[key])
//             }
//         })
//     }
// })();
 
 export const toArray = (obj) => {
    return Object.keys(obj).map((key) => obj[key])
 }