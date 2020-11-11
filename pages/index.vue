<template>
    <div>
        <body>
            <div class="container">
            
            <Header />
                <section>
                    <div class="row mt-1">
                        <div class="col-md-12" >
                            <b-card bg-variant="dark" text-variant="white" title="With Renbook">
                                <b-card-text>
                                    unlock the potential to access over 1,000,000 + pages in few clicks.
                                </b-card-text>
                                <b-button href="/auth/login" variant="outline-primary" style="border-radius:40px;color:#fff;">Get Started</b-button>
                            </b-card>
                        </div>
                    </div>
                </section>
                <section>
                <div class="row mt-4">
                    <div class="col-md-6" >
                        <h5>Available Books</h5>
                    </div>
                </div>
                <div class="row mt-4" v-if="!books">
                    No books yet!
                </div>
                <div class="row mt-4" v-else>
                    
                    <div class="col-md-3" v-for="book in books" :key="book.id">
                        <b-card
                        :title="book.title"
                        :img-src="book.image"
                        :img-alt="book.title"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                        >
                            <small>By: {{book.author}} <br> Published At: {{book.published_at}}</small>
                            
                            <b-card-text>
                            {{book.description}}
                            </b-card-text>

                            <b-button :href="'books/'+book.id" variant="outline-primary" style="border-radius:40px;">View this book</b-button>
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
            books:null
        }
    },
    components:{
        Header
    },
    methods:{
        getBooks(){
            this.$axios.get(`books`)
            .then(response => {

                let books = response.data.data
                
                this.books = books


            })
            .catch(error => {
                console.log(error.response);
            })
        }
    },
    mounted(){
        this.getBooks()
    }
}
</script>