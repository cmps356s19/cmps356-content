<template>
    <div>
        <h2>📇 Users</h2>
        <p v-if="error" class="text-danger">{{error}}</p>

        <p>Too lazy to provide a UI 🙄</p>
        <pre>{{users | json }}</pre>

    </div>
</template>

<script>
    import AuthService from '../services/AuthService'

    export default {
        data() {
            return {
                users: [],
                error: ''
            }
        },
        filters: {
            json: (value) => { return JSON.stringify(value, null, 2) }
        },
        //When the component is created then get the users using Google Web API
        async created() {
            try {
                this.error = '';
                this.users = await AuthService.getUsers()
            } catch (e) {
                console.error(e);
                this.error = `${e}😱`;
            }
        }
    }
</script>

<style scoped>

</style>