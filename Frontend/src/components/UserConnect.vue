<template>
  <!-- Rounded switch -->
  <label class="switch">
    <img class="lightmode" src="../assets/img.png" />
    <input type="checkbox">
    <span class="slider round"></span>
  </label>
  <div class="container">
  <div class="form-structor">
    <div class="signup" id="sign">
      <h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
      <div class="form-holder">
        <input type="text" class="input" placeholder="Name" />
        <input type="email" class="input" placeholder="Email" />
        <input type="password" class="input" placeholder="Password" />
      </div>
      <button class="submit-btn">Sign up</button>
    </div>
    <div class="login slide-up" id="log">
      <div class="center">
        <h2 class="form-title" id="login"><span>or</span>Log in</h2>
        <div class="form-holder">
          <input type="email" class="input" placeholder="Email" />
          <input type="password" class="input" placeholder="Password" />
        </div>
        <button class="submit-btn">Log in</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "UserRegister",
  data() {
    return {

    };
  },
  computed:{
  },
  methods:{
    goSignOrLogIn(){
      const loginBtn = document.getElementById("login");
      const signupBtn = document.getElementById("signup");

      loginBtn.addEventListener("click", (e) => {
        if (document.getElementById("log").className === "login slide-up") {
          let parent = e.target.parentNode.parentNode;
          Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
              parent.classList.add("slide-up");
            } else {
              signupBtn.parentNode.classList.add("slide-up");
              parent.classList.remove("slide-up");
            }
          });
        }
      });
      signupBtn.addEventListener("click", (e) => {
        if (document.getElementById("sign").className === "signup slide-up") {
          let parent = e.target.parentNode;
          Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
              parent.classList.add("slide-up");
            } else {
              loginBtn.parentNode.parentNode.classList.add("slide-up");
              parent.classList.remove("slide-up");
            }
          });
        }
      });
    },
  },
  mounted() {
    this.$nextTick(this.goSignOrLogIn)
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
  top: 16%;
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
  background-color: rgba(0, 0, 0, 0.4);
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
  background-color: rgba(0, 0, 0, 0.8);
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
  width: 65%;
  font-size: 12px;
}

.form-structor .login .center .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .login .center .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .login .center .submit-btn {
  background-color: #6B92A4;
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

.lightmode{
  width : 37px;
  height : 37px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  top: 15px;
  left: 80%;
  display: inline-block;
  width: 60px;
  height: 34px;
}
@media (max-width: 425px) {
  .switch {
    position: relative;
    top: 15px;
    left: 65%;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
}
/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 45px;
  right: -45px;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>