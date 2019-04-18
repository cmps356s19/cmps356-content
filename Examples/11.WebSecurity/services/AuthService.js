const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const keys = require('../config/keys');
const userRepository = require('../repositories/UserRepository');

class AuthService {
    async signup(req, res) {
        console.log(req.body);
        try {
            const user = userRepository.addUser(req.body);
            console.log('router.post(/signup)', user);

            res.status(201).json({
                success: 'User created'
            });
        } catch (error) {
            res.status(500).json({error});
        }
    }

    async login(req, res) {
        try {
            let user = await userRepository.login(req.body.email, req.body.password);

            //Generate JWT token using the secret key. Set the expiry to 2h
            if (user) {
                const id_token = jwt.sign(user, keys.jwt.secret,
                        {
                            expiresIn: '2h'
                        });

                return res.json({ id_token });
            }
        }
        catch (err) {
            console.log("Login", err);
            res.status(401).json({error: `Authentication failed. ${err}`});
        }
    }

    async addOpenIdUser(req, res) {
        try {
            const accessToken = req.query.access_token;
            const id_token = req.query.id_token;

            const oidToken = jwtDecode(id_token);
            console.log("Decoded oidToken: ", oidToken);
            console.log('/openid/:provider?access_token', accessToken);

            switch (req.params.provider) {
                case 'google':
                    //First check if the user already exists in the local users DB
                    let user = await userRepository.getOpenIdUser(oidToken.sub, 'google');
                    if (!user) {
                        console.log("addOpenIdUser.accessToken:", accessToken);
                        user = await this.getGoogleUserProfile(accessToken);

                        user.oidProvider = 'google';
                        user = await userRepository.addUser(user);
                        console.log("router.user: ", user);
                    }
                    console.log(user);
                    const id_token = jwt.sign(user, keys.jwt.secret,
                        {
                            expiresIn: '2h'
                        });
                    return res.json({ id_token });
                    break;
            }
        }
        catch (err) {
            console.log("Login", err);
            res.status(401).json({
                error: `Authentication failed. ${err}`
            });
        }
    }

    async getGoogleUserProfile(accessToken) {
        const options = {
            headers: {"Authorization": `Bearer ${accessToken}`}
        };

        const openIdUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        const userOpenId = await axios.get(openIdUrl, options);
        return userOpenId.data;
    }

    //Only authenticated users can access this route
    async getUsers(req, res) {
        if (req.user.role === 'Admin') {
            const users = await userRepository.getUsers();
            res.json(users);
        } else {
            res.status(403).json({
                error: "Access denied"
            });
        }
    }

    //region Helper Functions

    //Middleware function to Check if the user is authenticated
    async isAuthenticated(req, res, next) {
        let idToken = req.headers.authorization;
        console.log("isAuthenticated.idToken", idToken);
        try {
            if (idToken) {
                idToken = idToken.split(" ")[1];
                //Decode and verify jwt token using the secret key
                const decodedToken = await jwt.verify(idToken, keys.jwt.secret);
                //Assign the decoded token to the request to make the user details
                //available to the request handler
                req.user = decodedToken;
                next();
            }
            else {
                res.status(401).json({error: "Unauthorized. Missing JWT Token"});
            }
        } catch (error) {
            res.status(403).json({error});
        }
    }
    //endregion
}

module.exports = new AuthService();

//Old stuff not needed ... keeping it just in case 🙌
/*
//Used as a callback Url for Google Authentication on the client-side
router.get('/oauth/google/callback', (req, res) => {
    console.log(req.query);
    res.send('Ok');
});

// auth with google+
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/redirect
router.get('/google', passport.authenticate('google', {
    //scope: ['email', 'profile', 'openid']
    scope: ['profile', 'email', 'openid']
}));

// GET /auth/google/callback
// callback route for google to redirect to
// First use passport.authenticate() as route middleware to get the profile info from Google
router.get('/google/callback',
    // Finish OAuth 2 flow using Passport.js
    passport.authenticate('google'),
    (req, res) => {
        res.send(req.user);
        //res.redirect('/profile');
    });

router.post('/oauth/:provider', async function (req, res) {
    switch (req.params.provider) {
        case 'google':
            await googleOAuth(req, res);
            break;
    }
});

async function googleOAuth(req, res) {
    console.log('googleOAuth.req.body', req.body);
    const requestBody = {
        code: req.body.code,
        client_id: keys.google.clientID,
        client_secret: keys.google.clientSecret,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

   Request({
           method: 'post',
           url: 'https://accounts.google.com/o/oauth2/token',
           form: requestBody,
           headers: {
               'content-type': 'application/x-www-form-urlencoded'
           }
       }, async function (err, response, body) {
           try {
               if (!err && response.statusCode === 200) {
                   var responseJson = JSON.parse(body);
                   const idToken = responseJson.id_token;
                   const accessToken = responseJson.access_token;
                   console.log("access_token: ", responseJson.access_token);
                   console.log("id_token: ", idToken);
                   //Decode the token using the secret
                   const decodedToken = jwtDecode(idToken);
                   console.log("decodedToken: ", decodedToken);

                   const options = { headers:
                           {
                               "Authorization" : `Bearer ${accessToken}`
                           }
                   };

                   const gOpenIdConnect = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
                   let openIdUser = await axios.get( gOpenIdConnect, options );
                   console.log("openIdUser: ", openIdUser.data);

                   res.json(openIdUser.data);
               } else {
                   res.status(response.statusCode).json(err)
               }
           } catch (e) {
               console.error("googleOAuth", e);
               res.status(500).json(e)
           }
       });
}*/