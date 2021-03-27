require("dotenv").config()
const jwt = require('jsonwebtoken');
module.exports = verificarToken = (req,res,next)=>{

    const token = req.headers['authorization'].split(" ")[1];
    try{

        jwt.verify(token,process.env.LLAVE_SECRETA, (error,decode) => {
            if (typeof decode === 'undefined'){
                res.status(401).json({error_token:'Token requerido'});
            }else{
                const ahora = Math.floor(Date.now() / 1000);
                if (decode.exp < ahora) {
                    res.status(401).json({error_token:'Token ha expirado'});
                }else{
                    
                    req.user = decode;
                    next();
                }
            }
            
        })
    }catch(error){
        res.status(401).json({error_token:'Token requerido'})
    }
}