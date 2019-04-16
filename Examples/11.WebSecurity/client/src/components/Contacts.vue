<template>
    <div>
        <h2>📇 Contacts</h2>
        <p v-if="error" class="text-danger">
            {{error}}.
            <br>
            <router-link to="/login" class="nav-link" style="display: inline; padding: 0px">
                Login
            </router-link>
            <span style="color: black">
                using Google and authorize Hero App to access your Google Contacts
            </span>
        </p>

        <p v-else>User Postman to add a contact - too lazy to provide a UI  🙄</p>

        <table id="contactsTable" class="table table-bordered table-striped table-hover">
            <tr v-for="contact in contacts">
                <td> {{contact.name}}       </td>
                <td> {{ contact.address }}  </td>
                <td> {{ contact.email }}    </td>
                <td> {{ contact.phone }}    </td>
                <td> <img :src="contact.photoUrl"> </td>

                <td>
                  <span class="delete" title="Delete contact" @click="onDeleteContact(contact.id)">
                    <i style="color: indianred;" class="fa fa-minus-circle" aria-hidden="true"></i>
                  </span>
                </td>
            </tr>
        </table>
        <br>
    </div>
</template>

<script>
    import ContactService from '../services/ContactService'

    export default {
        data() {
            return {
                contacts: [],
                error: ''
            }
        },
        //When the component is created then get the contacts using Google Web API
        async created() {
            try {
                this.error = '';
                this.contacts = await ContactService.getContacts()
            } catch (e) {
                console.error(e);
                //If the access_token is missing or invalid then redirect to the login page
                if (e.code == 401) {
                    this.$router.push({ name: 'login', query: { redirect: '/contacts' } });
                }
                this.error = `${e.status}. ${e.message}😱`;
            }
        },

        methods: {
            async onDeleteContact(contactId) {
                if (!confirm('Confirm Delete?')) {
                    return;
                }

                try {
                    this.error = '';
                    await ContactService.deleteContact(contactId);

                    // Look for the contact to be deleted then remove it
                    const index = this.contacts.findIndex(h => h.id == contactId);
                    if (index >= 0) {
                        this.contacts.splice(index, 1);
                    }
                } catch (e) {
                    console.error(e);
                    //If the access_token is missing or invalid then redirect to the login page
                    /*
                    if (e.code == 401) {
                        this.$router.push({ name: 'login', query: { redirect: '/contacts' } });
                    }*/
                    this.error = `${e}😱`;
                }
            }
        }
    }
</script>

<style scoped>

</style>