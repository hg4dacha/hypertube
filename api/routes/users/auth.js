



async function auth(req, res) {
    console.log("I am in auth function :) !!!");
    /**
     * Fonction pour authentifier l'utilisateur
     * Renvoi un 200 avec les données utilisateur necessaire (incluant un token)
     * 
     * 
     * const user = await getUser() // fonction pour recup le user apres authentification
     * res.status(200).json(user)
     */

     res.status(200).json({status: "ok"})

}


module.exports = auth;