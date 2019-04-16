import Utils from "./Utils";

export default class AuthPopup {
    static popupAuthWindow(authUrl, authUrlParams) {
        const queryString = Utils.stringifyUrlParams(authUrlParams);
        authUrl = `${authUrl}?${queryString}`;
        console.log("popupAuthWindow.authUrl", authUrl);

        const authWindow = window.open(authUrl, "Auth Window", 'width=800, height=600');
        if (authWindow && authWindow.focus) {
            authWindow.focus();
        }

        return new Promise((resolve, reject) => {
            let pollTimer = setInterval(() => {
                if (!authWindow || authWindow.closed || authWindow.closed === undefined) {
                    clearInterval(pollTimer);
                    pollTimer = null;
                    reject('Auth popup window closed');
                }

                try {
                    let authWindowUrl = authWindow.document.URL;
                    console.log(authWindowUrl);
                    if (authWindowUrl.indexOf(authUrlParams.redirect_uri) != -1) {
                        clearInterval(pollTimer);
                        pollTimer = null;
                        //Get part of the Url after the hash
                        authWindowUrl = authWindow.location.hash.substring(1).replace(/[\/$]/, '');
                        //console.log("authWindow.location.hash", authWindowUrl);
                        const authReply = Utils.parseQueryString(authWindowUrl);
                        authWindow.close();
                        resolve(authReply);
                    }
                } catch (e) {
                    console.log(e);
                }
            }, 500);
        });
    }
}