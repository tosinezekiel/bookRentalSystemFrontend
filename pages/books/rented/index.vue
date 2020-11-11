<template>
    <div>
        <body>
            <div class="container">
            
            <Header />
                
                <section>
                <div class="row mt-4">
                    <div class="col-md-6" >
                        <h5>Rented Books</h5>
                    </div>
                </div>
                <div class="row mt-4" v-if="!rents">
                    No books yet!
                </div>
                <div class="row mt-4" v-if="rents">
                    
                    <div class="col-md-4" v-for="rent in rents" :key="rent.id">
                        <b-card
                        :title="rent.book.title"
                        :img-src="rent.book.image"
                        :img-alt="rent.book.title"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                        >
                            <small>By: {{rent.book.author}} <br> Published At: {{rent.book.published_at}}</small>
                            
                            <b-card-text>
                            {{rent.book.description}}
                            </b-card-text>
                           
                            <div>
                                <b-button @click.prevent="readBook(rent.id)">Read</b-button>
                                <b-button @click.prevent="returnBook(rent.id)" variant="primary">Return</b-button>
                                <b-button @click.prevent="cancelBook(rent.id)" variant="outline-danger">Cancel</b-button>
                                <b-badge variant="primary" @click.prevent="renewBook(rent.id)" v-b-tooltip.hover title="Renew" class="renew"><i class="fas fa-redo"></i></b-badge>
                                
                            </div>

                            <div class="mt-3">
                            <b-button variant="primary">
                                Expires on <b-badge variant="light">{{rent.one_week}}</b-badge>
                            </b-button> 
                            </div>
                            
                        </b-card>
                    </div>
                    
                </div>
                </section>
            
            <footer >
                <div class="row mt-4">
                    <div class="col-md-12" style="background:#343A40;color:#fff; text-align:center;">
                        <small>Renbook.com &copy; 2020</small>
                    </div>
                </div>
            </footer>
        </div>
            

        </body>
    </div>
    
</template>
<script>
import Header from '~/components/nav'
export default {
    name:"home",
    data(){
        return {
            rents:null
        }
    },
    components:{
        Header
    },
    methods:{
        getRentedBooks(){
            this.$axios.get(`rents`)
            .then(response => {

                let rents = response.data.data
                
                this.rents = rents


            })
            .catch(error => {
                if (error.response.status == 422){
                    this.errors = error.response.data.errors
                    this.$noty.error(error.response.data.message);
                    return false;
                }
                this.$noty.error("Something went wrong.");
            })
        },
        cancelBook(id){
            this.$axios.get(`rents/${id}/cancel`)
            .then(response => {
                this.$noty.success("Book cancelled successfully.")
                this.getRentedBooks()

            })
            .catch(error => {
                if (error.response.status == 422){
                    this.errors = error.response.data.errors
                    this.$noty.error(error.response.data.message);
                    return false;
                }
                this.$noty.error("Something went wrong.");
            })
        },
        returnBook(id){
            this.$axios.get(`rents/${id}/return`)
            .then(response => {
                this.$noty.success("Book returned successfully.")
               this.getRentedBooks()


            })
            .catch(error => {
                if (error.response.status == 422){
                    this.errors = error.response.data.errors
                    this.$noty.error(error.response.data.message);
                    return false;
                }
                this.$noty.error("Something went wrong.");
            })
        },
        renewBook(id){
            this.$axios.get(`rents/${id}/renew`)
            .then(response => {
                 this.$noty.success("Book renewed successfully.")
                this.getRentedBooks()
            })
            .catch(error => {
                if (error.response.status == 422){
                    this.errors = error.response.data.errors
                    this.$noty.error(error.response.data.message);
                    return false;
                }
                this.$noty.error("Something went wrong.");
            })
        }
    },
    mounted(){
        this.getRentedBooks()
    },
    middleware:['auth']
    
}
</script>
<style scoped>
.renew:hover{
    cursor:pointer;
}
</style>