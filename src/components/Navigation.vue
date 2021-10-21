<template>
    <div>
        <b-nav pills align="left" class="nav">
            <b-nav-item router-link :to="{ name: 'Register' }"> REGISTER</b-nav-item>
            <b-nav-item disabled>|</b-nav-item>
            <b-nav-item router-link :to="{ name: 'User' }">USERS</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style scoped>
    .nav {
        margin-top: 30px;
        margin-left: 100px;
        position: fixed;
    }
</style>
