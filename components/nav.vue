<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">RENBOOK</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->
        

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-navbar-nav v-if="!loggedIn">
                    <b-nav-item><nuxt-link to="/auth/login" style="text-decoration:none; color:#fff;">Login</nuxt-link></b-nav-item>
                    <b-nav-item><nuxt-link to="#" style="text-decoration:none; color:#fff;">Register</nuxt-link></b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-if="loggedIn">
                    <b-nav-item><nuxt-link to="/books/rented" style="text-decoration:none; color:#fff;">Active Books</nuxt-link></b-nav-item>
                    
            </b-navbar-nav>
            <b-nav-item-dropdown right v-if="loggedIn">
            <!-- Using 'button-content' slot -->
            
                <template #button-content>
                    {{user.email}}
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>
<script>
export default {
    methods:{
    async logout(){

        await this.$auth.logout()
        .catch(error => {
            console.log(error.response)
        })
        this.$router.push({
            path:'/auth/login'
        })

    }

  }
}
</script>