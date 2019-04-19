import {getContacts, deleteContact} from '../api-calls/ContactService'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');

    //When the component is created then get the contacts using Google Web API
    useEffect(() => {
        setError('');
        getContacts().then(contacts => setContacts(contacts)).catch(e => {
            console.error(e);
            setError(`${e.code} ${e.status}. ${e.message}😱`);
        })
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
            setError(`${e}😱`);
        }
    }

    return (
        <div>
            <h2>📇 Contacts</h2>
            {error &&
            <>
                <p className="text-danger">
                    {error}
                </p>
                <Link to="/login">Login</Link>
                <span> using Google and authorize Hero App to access your Google Contacts</span>
            </>
            }

            {!error &&
            <p>User Postman to add a contact - too lazy to provide a UI 🙄</p>
            }
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
                            <span title="Delete contact" onClick={() => onDeleteContact(contact.id)}>
                                <i style={{color: "indianred"}} className="fas fa-minus-circle"></i>
                            </span>}
                        </td>
                    </tr>)
                )}
                </tbody>
            </table>
        </div>
    );
}