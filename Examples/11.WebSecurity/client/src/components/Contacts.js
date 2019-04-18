import {getContacts, deleteContact} from '../api-calls/ContactService'
import React, {useEffect, useState} from "react";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');

    //When the component is created then get the contacts using Google Web API
    useEffect(() => {
        try {
            setError('');
            getContacts().then(contacts => setContacts(contacts));
        } catch (e) {
            console.error(e);
            //If the access_token is missing or invalid then redirect to the login page
            /* if (e.code == 401) {
                history.push({ name: 'login', query: { redirect: '/contacts' } });
            }*/
            setError(`${e.status}. ${e.message}😱`);
        }
    }, []);


    const onDeleteContact = async (contactId) => {
        if (!confirm('Confirm Delete?')) {
            return;
        }

        try {
            setError('');
            await deleteContact(contactId);

            // Remove the deleted contact
            setContacts(contacts.filter(c => c.id != contactId));
        } catch (e) {
            console.error(e);
            //If the access_token is missing or invalid then redirect to the login page
            /*
            if (e.code == 401) {
                this.$router.push({ name: 'login', query: { redirect: '/contacts' } });
            }*/
            setError(`${e}😱`);
        }
    }

    return (
        <div>
            <h2>📇 Contacts</h2>
            {error && <p className="text-danger">
                {error}.
            </p>}
            {/*                    <br>
                        <router-link to="/login" className="nav-link" style="display: inline; padding: 0px">
                            Login
                        </router-link>
                        <span style="color: black">
                using Google and authorize Hero App to access your Google Contacts
            </span>*/}


            <p>User Postman to add a contact - too lazy to provide a UI 🙄</p>

            <table>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td> {contact.name} </td>
                        <td> {contact.address} </td>
                        <td> {contact.email} </td>
                        <td> {contact.phone} </td>
                        <td><img src={contact.picture}/></td>
                        <td>
                            <a href="#" onClick={() => onDeleteContact(contact.id)}>Delete</a>
                            {/*<span className="delete" title="Delete contact" onClick={() => onDeleteContact(contact.id)}>
                                <i style="color: indianred;" className="fa fa-minus-circle" aria-hidden="true"></i>
                            </span>*/}
                        </td>
                    </tr>)
                )}
                </tbody>
            </table>
        </div>
    );
}