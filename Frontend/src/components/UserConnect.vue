<template>

  <div class="container">
  <div class="form-structor">
    <div class="signup" id="sign">
      <h2 class="form-title test-2" id="signup"><span>or</span>Sign up</h2>
      <div class="form-holder test">
        <input v-model="pseudo" type="text" class="input" placeholder="Pseudo"/>
        <input v-model="email" type="email" class="input" placeholder="Email"/>
        <input v-model="registerPassword" type="password" class="input" placeholder="Password"/>
      </div>
      <button class="submit-btn test" type="submit" v-on:click="onSubmit">Sign up</button>
    </div>
    <div class="login slide-up" id="log">
      <div class="center">
        <h2 class="form-title" id="login"><span>or</span>Log in</h2>
        <div class="form-holder">
          <input v-model="emailOrPseudo" type="email" class="input" placeholder="Pseudo or Email"/>
          <input v-model="password" type="password" class="input" placeholder="Password" />
        </div>
        <button class="submit-btn" type="submit" v-on:click="onSubmit">Log in</button>
      </div>
    </div>
  </div>
  </div>
  <form @submit.prevent="onSubmit" data-netlify-recaptcha data-netlify>
    <vue-recaptcha
        ref="invisibleRecaptcha"
        @verify="connect"
        @expired="onExpired"
        size="invisible"
        :sitekey="sitekey">
    </vue-recaptcha>
  </form>
</template>

<script>
import http from "../http-common";
import {mapActions} from 'vuex';
import {VueRecaptcha} from "vue-recaptcha";

export default {
  name: "UserRegister",
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  data() {
    return {
      lightMode: false,
      language: false,

      pseudo:"",
      email: "",
      registerPassword: "",
      regiser: true,


      emailOrPseudo: "",
      password: "",
      login: false,

      sitekey: '6Ld9kGQhAAAAAKPiP-s5yYj8Bpr1LP1RJFUPv34B',
    };
  },
  computed:{
  },
  methods:{
    ...mapActions(['updateStorage']),
    //to register or login user
    connect(response){
      //if user want to login
      if (this.login){
        //set parameters
        const userLogin = {
          emailOrPseudo: this.emailOrPseudo,
          password: this.password,
          recaptchaToken: response
        }
        //if form is not fully completed
        if (this.emailOrPseudo ===  "" || this.password === ""){
          alert("Fill the all form please");
          this.$router.go();
        }
        //connect user via the back
        http
            .post("/user/logIn", userLogin)
            .then(res => {
              //update elements in store
              this.$store.state.actualUser = res.data.user;
              this.$store.state.actualToken = res.data.token;
              //connect to store to localStorage
              this.updateStorage();
              //if login successfull with all authorization go to the Home Page
              this.$router.push("/HomePage")
            })
            //if there is error
            .catch(err => {
              //tell the user what error this is
              alert(err.response.data.error)
              //reload page to reset captcha
              this.$router.go();
            })
      }
      //if user want to register
      else if (this.regiser){
        //set parameters
        const userRegister = {
          pseudo: this.pseudo,
          email: this.email,
          password: this.registerPassword,
          recaptchaToken: response
        }
        //if form is not fully completed
        if (this.pseudo ===  "" || this.email === "" || this.registerPassword === ""){
          alert("Fill the all form please");
          this.$router.go();
        }
        else {
          //if email case is not an email
          if (!this.email.includes('@')) {
            alert("Please enter an valid email")
            this.$router.go();
          }
          else {
            http
                .post("/user/register", userRegister)
                .then(res => {
                  //inform that the user is created
                  alert(res.data.message + "Now go login");
                  this.$router.go();
                })
                .catch(err => {
                  //if not created
                  alert(err.response.data.error);
                  this.$router.go();
                })
          }
        }
      }
      //if error...
      else {
        alert("Unexcepted error");
        this.$router.go();
      }
    },

    //to execute automatique captcha
    onSubmit: function () {
      this.$refs.invisibleRecaptcha.execute()
    },

    //if captcha token is expired
    onExpired() {
      console.log('Expired')
    },

    //Front to choose between login or register
    goSignOrLogIn(){
      //get buttons to switch
      const loginBtn = document.getElementById("login");
      const signupBtn = document.getElementById("signup");

      //listen login button
      loginBtn.addEventListener("click", (e) => {
        if (document.getElementById("log").className === "login slide-up") {
          let parent = e.target.parentNode.parentNode;
          Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            //go to log in
            if (element !== "slide-up") {
              parent.classList.add("slide-up");
              //set bool
              this.login = true;
              this.regiser = false;
            } else {
              signupBtn.parentNode.classList.add("slide-up");
              parent.classList.remove("slide-up");
            }
          });
        }
      });
      //idem
      signupBtn.addEventListener("click", (e) => {
        if (document.getElementById("sign").className === "signup slide-up") {
          let parent = e.target.parentNode;
          Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
              parent.classList.add("slide-up");
              this.login = false;
              this.regiser = true;
            } else {
              loginBtn.parentNode.parentNode.classList.add("slide-up");
              parent.classList.remove("slide-up");
            }
          });
        }
      });
    },

    //to verify AWP token
    test(){
      const uri = "/user/test";
      const options = {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.$store.state.actualToken
        }
      };
      http
          .request(uri, options)
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))
    },
  },
  mounted() {
    this.$nextTick(this.goSignOrLogIn)

    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
    document.head.appendChild(recaptchaScript)

    let recaptchaScriptRender = document.createElement('script')
    recaptchaScriptRender.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
    document.head.appendChild(recaptchaScriptRender)
  }
}
</script>

<style scoped>


.container{
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-structor {
  background-color: #222;
  border-radius: 15px;
  top: 13%;
  position: absolute;
  height: 75%;
  width: 90%;
  overflow: hidden;
}
.form-structor::after {
  content: "";
  opacity: 0.8;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-color: #191A36;
  background-image: url("https://imgur.com/Uc1dbgP.png");
  background-position: left;
}

@media (max-width: 768px){
  .form-structor::after {

    background-image: url("https://imgur.com/rCH8Qud.jpg");
    background-position: center;
  }
}

.form-structor .signup {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 45%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}

@media (max-width: 1024px) {
  .form-structor .signup {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    width: 65%;
    z-index: 5;
    -webkit-transition: all 0.3s ease;
  }
}
.form-structor .signup.slide-up {
  top: 5%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slide-up .form-holder, .form-structor .signup.slide-up .submit-btn {
  opacity: 0;
  visibility: hidden;
}
.form-structor .signup.slide-up .form-title {
  font-size: 1em;
  cursor: pointer;
}
.form-structor .signup.slide-up .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-title {
  color: #fff;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .signup .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}

.form-structor .signup .form-holder {
  border-radius: 15px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 50px;
  opacity: 0.9;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}

.form-structor .signup .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
}
.form-structor .signup .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .signup .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .signup .submit-btn {
  background-color: rgba(77, 33, 41, 1);
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 30%;
  min-width: 150px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 1);
}
.form-structor .login {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
  background-color: #d8bc94;
}

.form-structor .login::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -20px;
  -webkit-transform: translate(-50%, 0);
  width: 200%;
  height: 250px;
  border-radius: 50%;
  z-index: 4;
  -webkit-transition: all 0.3s ease;
  background-color: #d8bc94;
}
.form-structor .login .center {
  position: absolute;
  top: calc(50% - 10%);
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;

}
.form-structor .login .center .form-title {
  color: #000;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .login .center .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder {
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
  margin-left: 27%;
  width: 45%;
}
@media (max-width: 1024px) {
  .form-structor .login .center .form-holder {
    border-radius: 15px;
    background-color: #fff;
    border: 1px solid #eee;
    overflow: hidden;
    margin-top: 50px;
    opacity: 1;
    visibility: visible;
    -webkit-transition: all 0.3s ease;
    margin-left: 7%;
    width: 90%;
  }
}
.form-structor .login .center .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
}

.form-structor .login .center .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .login .center .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .login .center .submit-btn {
  background-color: var(--darkBordeaux);
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 30%;
  min-width: 140px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}


.form-structor .login .center .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);

}
.form-structor .login.slide-up {
  top: 90%;
  -webkit-transition: all 0.3s ease;

}
.form-structor .login.slide-up .center {
  top: 10%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;

}
.form-structor .login.slide-up .form-holder, .form-structor .login.slide-up .submit-btn {
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-title {
  font-size: 1em;
  margin: 0;
  padding: 0;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}

.test{
  position: relative;
  top: -50px;
}

.test-2{
  position: relative;
  top: -30px;
}
</style>