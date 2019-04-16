import AuthPopup from './AuthPopup'
import Utils from './Utils'

export default class AuthService {
    //region Web API Calls
    static WebApiBaseUrl = `http://${window.location.hostname}:3040/auth`;
    static user;

    static async login(user) {
        this.user = null;
        const url = `${this.WebApiBaseUrl}/login`;
        try {
            const response = await fetch(url, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
            //If authentication failed
            if (response.status == 401 || response.status == 403) {
                const responseJson = await response.json();
                throw responseJson.error;
            }

            //If other error occurs
            if (!response.ok) {
                throw response.statusText
            }

            const responseJson = await response.json();

            //Store idToken in the local storage
            localStorage.idToken = responseJson.idToken;
            console.log('idToken: ', responseJson.idToken);
            return this.getUser();
        } catch (err) {
            throw err;
        }
    }

    static logout() {
        this.user = null;
        delete localStorage.idToken;
        delete localStorage.access_token;
    }

    static async authOpenId(oidProvider, manageMyGoogleContacts) {
        //ToDo: We can add support for other OpenID Connect providers (e.g., Twitter and Facebook) for now only Google is supported
        const authUrl = 'https://accounts.google.com/o/oauth2/auth';
        const authUrlParams = {
            scope: 'profile email',
            client_id: '866457396346-piq09ek9kiofq9uspsnjulv1mu1v4s8k.apps.googleusercontent.com',
            response_type: 'id_token token',
            redirect_uri: window.location.origin //the root of current Url on the address bar
        };

        //If the user requests managing his/her Google contacts then add contacts to the OAuth scope
        if (manageMyGoogleContacts) {
            authUrlParams.scope = `${authUrlParams.scope} https://www.googleapis.com/auth/contacts`;
        }

        try {
            //Get id_token & access_token from Google Authorization endpoint
            const authReply = await AuthPopup.popupAuthWindow(authUrl, authUrlParams);

            //If the user grants access then ask to server to get and store the user profile then return a jwt
            if (authReply && authReply.access_token) {
                console.log('id_token from Google', authReply.id_token);
                console.log('Decoded id_token from Google',  Utils.decodeJwt(authReply.id_token));
                console.log('access_token from Google', authReply.access_token);

                const response = await this.getUserProfile(authReply);

                //Store idToken in the local storage
                localStorage.idToken = response.idToken;
                localStorage.access_token = authReply.access_token;
                console.log('idToken from Hero Web API: ', response.idToken);

                const user = this.getUser();
                return user;
            } else {
                throw "Authentication failed 😱";
            }
        } catch (e) {
            console.log("authOpenId.catch", e);
            throw e;
        }
    }

    static async getUserProfile(authReply) {
        const url = `${this.WebApiBaseUrl}/openid/google?access_token=${authReply.access_token}&id_token=${authReply.id_token}`;
        const response = await fetch(url);
        return await response.json()
    }

    static async getUsers() {
        const url = `${this.WebApiBaseUrl}/users`;

        const headers = new Headers();
        const idToken = AuthService.getIdToken();
        headers.append('Authorization', `Bearer ${idToken}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        //If authorization failed
        if (response.status == 403) {
            const responseJson = await response.json();
            throw responseJson.error;
        }

        //If other error occurs
        if (!response.ok) {
            throw response.statusText
        }

        return await response.json();
    }
    //endregion

    static isUserInRole(role) {
        const user = this.getUser();
        return (user && user.roles.indexOf(role) >= 0);
    }

    static isGoogleAuth() {
        const user = this.getUser();
        return (user && user.oidProvider === "google");
    }

    static getUserDefaultUrl() {
        let defaultUrl = '/';
        const user = this.getUser();
        //By default redirect users to contacts if they login using Google
        if (this.isGoogleAuth()) {
            defaultUrl = "contacts";
        }
        //By default redirect admin users to users route upon login
        else if (this.isUserInRole('Admin')) {
            defaultUrl = "users";
        }

        return defaultUrl;
    }

    static getUser() {
        if (!this.user && localStorage.idToken) {
            //Decode to idToken to get the user object
            this.user = Utils.decodeJwt(localStorage.idToken);
        }
        return this.user;
    }

    static getAccessToken() {
        const accessToken = localStorage.access_token;
        if (accessToken) {
            return accessToken;
        } else {
            throw {
                code: 401,
                error: "Access Token missing 😱",
                status: "UNAUTHENTICATED"
            }
        }
    }

    static getIdToken() {
        const idToken = localStorage.idToken;
        if (idToken) {
            return idToken;
        } else {
            throw {
                code: 401,
                error: "Id Token missing 😱",
                status: "UNAUTHENTICATED"
            }
        }
    }
    //endregion
}