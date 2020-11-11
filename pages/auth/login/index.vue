<template>
    <div>
        <body>
            <div class="container">
         
                <section>
                    <div class="row mt-5 justify-content-center">
                        <div class="col-md-4" >
                            <div>
                                <b-card title="Login" class="mb-0">
                                    <small class="mt-0">Welcome Back, We are glad to have you back</small>
                                    <b-form-group class="mt-2">
                                        <b-form-input
                                        id="input-1"
                                        type="email"
                                        required
                                        placeholder="Email"
                                        v-model="form.email"
                                        style="border-radius:40px;"
                                        ></b-form-input>
                                        
                                        <small class="text-danger" v-if="validation">
                                            {{errors.email[0]}}
                                        </small>
                                        <small class="text-danger" v-if="credentials">
                                            {{errors.message}}
                                        </small>
                                            
                                        
                                        
                                    </b-form-group>

                                    <b-form-group id="input-group-2">
                                        <b-form-input
                                        id="input-2"
                                        type="password"
                                        required
                                        placeholder="Password"
                                        v-model="form.password"
                                        style="border-radius:40px;"
                                        ></b-form-input>
                                         <small class="text-danger" v-if="validation">
                                            {{errors.password[0]}}
                                        </small>
                                    </b-form-group>

                                    <b-form-group id="input-group-2">
                                        <b-button variant="outline-primary" @click="submit" :disabled="disable" class="btn-sm" style="border-radius:40px;width:30%;">Login</b-button>
                                    </b-form-group>

                                    <nuxt-link to="/" class="card-link">Go Home</nuxt-link> | <nuxt-link to="#" class="card-link ml-0">Sign up</nuxt-link>
                                </b-card>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
            

        </body>
    </div>
    
</template>
<script>

export default {
    name:"login",
    data(){
      return {
          form:{
              email:"",
              password:""
          },
          disable: false
      }
  },
  computed: {
    validation() {
      return Object.keys(this.errors).length > 0 && !("message" in this.errors)
    },
    credentials() {
      return Object.keys(this.errors).length > 0 && ("message" in this.errors)
    }
  },
  methods:{
     async submit(){
        this.disable = !this.disable
        await this.$auth.login({
            data:this.form
        }).catch(error => {
            this.disable = !this.disable
        })
        
        
        
        this.authenticated()
       
    },
    authenticated(){
        const logged = this.loggedIn
    }
    
  },
  middleware:['guest']
}
</script>