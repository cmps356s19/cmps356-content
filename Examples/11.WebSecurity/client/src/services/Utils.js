export default class Utils {
    //region Helper Functions
    static decodeJwt(token) {
        if (!token) return token;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        } catch (e) {
        }
    }

    /**
     * Parse query string variables
     *
     * @author Sahat Yalkabov <https://github.com/sahat>
     * @copyright Method taken from https://github.com/sahat/satellizer
     *
     * @param  {String} Query string
     * @return {String}
     */
    static parseQueryString(str) {
        let obj = {};
        let key;
        let value;
        (str || '').split('&').forEach((keyValue) => {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true;
            }
        });
        return obj;
    }

    static getRedirectUri(uri) {
        try {
            return (this.isDefined(uri))
                ? `${window.location.origin}${uri}`
                : window.location.origin
        } catch (e) {
        }

        return uri || null;
    }

    //Convert params object into a concatenated query string
    static stringifyUrlParams(urlParams) {
        const params = [];
        for (const paramKey in urlParams) {
            if (this.isDefined(urlParams[paramKey])) {
                params.push(`${paramKey}=${urlParams[paramKey]}`);
            }
        }
        return encodeURI(params.join('&'));
    }

    static isUndefined(value) {
        return typeof value === 'undefined';
    }

    static isDefined(value) {
        return typeof value !== 'undefined';
    }
}