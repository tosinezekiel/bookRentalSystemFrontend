<template>
    <div>
        <body>
            <div class="container">
            
            <Header />
                <section>
                    <div class="row mt-1">
                        <div class="col-md-12" >
                            <b-card v-if="!book">
                                No Record Found!.
                            </b-card>
                            <b-card
                            :img-src="book.image"
                            bg-variant="dark" text-variant="white" img-left class="mb-3" :title="'Title: '+book.title" v-else>
                                <b-card-text>
                                    {{book.description}}
                                </b-card-text>
                                <small> Author: {{book.author}}</small><br>
                                <small> Published At: {{book.published_at}}</small><br>
                                <b-button variant="primary" class="mt-3" style="border-radius:40px;color:#fff;" @click.prevent="rentBook(book.id)">Rent this book</b-button>
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
            book:null
        }
    },
    components:{
        Header
    },
    methods:{
        showBook(){
            let id = this.$route.params.bookid;
            let self = this
            this.$axios.get(`books/${id}`)
            .then(response => {
                let book = response.data.data
                this.book = book
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

        rentBook(id){
            
            let self = this
            this.$axios.get(`books/${id}/rent`)
            .then(response => {
                this.$noty.success("Book added to collection successfully.")
                this.$router.push({
                    path:'/books/rented'
                })
            })
            .catch(error => {
                if (error.response.status == 422){
                    this.errors = error.response.data.errors
                    this.$noty.error(error.response.data.message);
                    return false;
                }
                this.$noty.error(error.response.data.message);
            })
        }
    },
    mounted(){
        this.showBook()
    },
    middleware:['auth']
}
</script>