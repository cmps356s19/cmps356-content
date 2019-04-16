/*****************************
 Functions to call Web API
 *****************************/
import AuthService from './AuthService'
export default class ContactService {
//region Web API Calls
    static WebApiBaseUrl = `https://people.googleapis.com/v1`;
    static async getContacts() {
        const queryString = 'personFields=names,emailAddresses,phoneNumbers,addresses,photos';
        const url = `${this.WebApiBaseUrl}/people/me/connections?${queryString}`;

        const headers = new Headers();
        const accessToken = AuthService.getAccessToken();
        console.log('ContactService.accessToken', accessToken);
        headers.append('Authorization', `Bearer ${accessToken}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        //If authentication failed
        if (response.status == 401 || response.status == 403) {
            const responseJson = await response.json();
            throw responseJson.error;
        }

        //If other error occurs
        if (!response.ok) {
            throw { status: "", message: response.statusText }
        }

        let contacts = await response.json();
        contacts = contacts.connections;

        contacts = contacts.map(c => {
            let contact =
                {
                    id: c.resourceName,
                    name: c.names[0].displayName,
                    photoUrl: c.photos ? c.photos[0].url : '',
                    address: c.addresses ? c.addresses[0].formattedValue : '',
                    email: c.emailAddresses ? c.emailAddresses[0].value : '',
                    phone: c.phoneNumbers ? c.phoneNumbers[0].value : ''
                };
            return contact;
        });

        return contacts;
    }

    static async deleteContact(contactId) {
        //e.g. url https://people.googleapis.com/v1/people/c3010450149784813258:deleteContact
        const url = `${this.WebApiBaseUrl}/${contactId}:deleteContact`;
        console.log('deleteContact.url', url);

        const headers = new Headers();
        const accessToken = AuthService.getAccessToken();
        console.log('ContactService.accessToken', accessToken);
        headers.append('Authorization', `Bearer ${accessToken}`);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
        });

        //If authentication failed
        if (response.status == 401) {
            const responseJson = await response.json();
            throw responseJson.error;
        }

        //If other error occurs
        if (!response.ok) {
            throw response.statusText
        }

    }
//endregion
}