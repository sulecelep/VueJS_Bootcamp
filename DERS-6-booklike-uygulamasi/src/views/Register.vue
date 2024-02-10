<template>
     <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Register</h3>
      <input type="text" v-model="userData.fullname" placeholder="Tam Ad" class="input mb-3" />
      <input type="text" v-model="userData.username" placeholder="Kullanıcı Adı" class="input mb-3" />
      <input type="password" v-model="userData.password" placeholder="Şifre" class="input mb-3" />
      <button class="default-button" @click="onSave">Kayıt ol</button>
      <span class="text-center mt-3 text-sm">
        Zaten Üyeyim,
        <router-link :to="{name : 'LoginPage'}" class="text-red-900 hover:text-black">
          Giriş yap!
        </router-link>
        
      </span>
    </div>
</template>
<script>
import CryptoJS from "crypto-js"
export default {
  data(){
    return {
      userData:{
        username:null,
        fullname:null,
        password:null,
      }
    }
  },
  methods:{
    onSave(){

      const password = CryptoJS.HmacSHA1(this.userData.password,this.$store.getters._saltKey).toString();
      this.$appAxios.post("/users",{...this.userData, password}).then(registered_user_response=>{
        console.log('registered_user_response', registered_user_response);
        this.$router.push({name:'HomePage'});
      });
      
     
      //console.log(cryptedPassword);
      //const decryptedPassword= CryptoJS.AES.decrypt(cryptedPassword,key).toString(CryptoJS.enc.Utf8);
      //console.log(decryptedPassword);

      //console.log(this.userData);
    }
  }

}
</script>