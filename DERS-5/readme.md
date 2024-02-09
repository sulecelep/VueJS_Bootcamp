# Vue Router

Vue router dokümantasyonu için [tıklayınız](https://router.vuejs.org/installation.html)

````
npm install vue-router@4

````

## Router'lar Arasında Navigation Yapmak

```` html

  <router-link to="/">
    Anasayfa
  </router-link>

  <router-link to="/hakkimda">
    Hakkımda
  </router-link>


````
*bu şekilde yazıldığında sayfa yenilemeden sayfalar arası geçiş yapılabiliyor.*

## Router Kullanımı Örnek 1 

### App.vue
````html

<template>
  <div class="container pt-2">
    <div class="mb-2">
      <router-link class="nav-link" active-class="active" to="/"> Anasayfa </router-link>
      <router-link class="nav-link" active-class="active" to="/hakkimda"> Hakkımda </router-link>
      <router-link class="nav-link" active-class="active" to="/detay/1"> Detay </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<style>
.nav-link {
  padding: 5px 10px;
  text-decoration: none;
  border: 1px solid #fa6558;
  color: #fa6558;
  margin-right: 5px;
  margin-top: 5px;
  display: inline-block;
}
.active {
  background-color: #fa6558;
  color: #fff;
}
</style>

````

## Home.vue
````html
<template>
  <h1>Home</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam a dignissimos voluptatibus omnis vero! Eum alias illo quas distinctio tempore.</p>
  <input type="text" @keydown.enter="goToDetails" >

</template>

<script>
export default {
    
    methods:{
      goToDetails(e){
            //this.$router.push(`/detay/${e.target.value}`); // 1. yöntem

            this.$router.push({
              name:"DetailPage",
              params:{
                userID: e.target.value, //burada User/Detail/{userID} sayfasına id ile gidilecekse userID'yi bu şekilde alıyoruz
              },
              query:{
                type:"DetailAuth",
                user:"sulecelep",
              }
            });
        }
    }
}

</script>

````

## Details.vue

````html
<template>
    <h1>{{ $route.params.userID }}</h1>
    <p>Açıklamalar burada yer alacaktır..</p>

    <p>{{ $route.query.user }}</p>
    <p>{{ $route.query.type }}</p>
    

    <button @click="goBack" >Geri Dön</button>

</template>

<script>
export default {
    created(){
        console.log(this.$route)
    },
    methods:{
        goBack(){
            this.$router.push("/"); // 1. yöntem
        }
    }
}

</script>

````


## Router Kullanımı Örnek 2

### main.js

*burada globale açıyoruz*


````js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import {appAxios} from './utils/appAxios';

const app= createApp(App);
app.use(router);
app.config.globalProperties.$axios=axios;
app.config.globalProperties.$appAxios=appAxios;
app.mount('#app');

````

### appAxios.js

*custom axios yazdık appAxios adında bir custom yazıldı*

````js
import axios from "axios";

export const appAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    //"Token": "myToken",
    "Content-Type": "application/json",
  },
});


````


### HomePage.vue
````html
<template>
  <div class="card border p-2">
    <div class="d-flex justify-content-end">
      <button class="btn btn-sm btn-primary mb-3" @click="$router.push({ name: 'NewBookmark' })">+ Yeni Ekle</button>
    </div>
    <table class="table table-ligth table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Başlık</th>
          <th scope="col">URL</th>
          <th scope="col">Açıklama</th>
          <th scope="col">Sil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in bookmarkList" :key="item">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.title }}</td>
          <td>
            <a :href="item.url" target="_blank">{{ item.url }}</a>
          </td>
          <td>{{ item.description }}</td>
          <td><button class="btn-sm btn btn-danger" @click="deleteBookmark(item)">Sil</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks").then((bookmark_list_response) => {
      this.bookmarkList = bookmark_list_response.data || [];
      console.log("bookmark_list_response", bookmark_list_response);
    });
  },
  methods: {
    deleteBookmark(item) {
        //console.log('delete_item', item);
        this.$appAxios.delete(`/bookmarks/${item.id}`).then(delete_response =>{
            console.log( delete_response);
            if(delete_response.status ===200){
                this.bookmarkList = this.bookmarkList.filter(b=>b.id != item.id);
            }
        });
    },
  },
};
</script>

````


### NewBookmark.vue

````html
<template>
  <div class="form-area card border p-2">
    <div class="mb-3">
      <label for="title" class="form-label">Başlık</label>
      <input type="text" v-model="userData.title" class="form-control" id="title" placeholder="kablosuzkedi ..." />
    </div>
    <div class="mb-3">
      <label for="url" class="form-label">URL</label>
      <input type="text" v-model="userData.url" class="form-control" id="url" placeholder="https:// ..." />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Açıklama</label>
      <textarea class="form-control" v-model="userData.description" id="description" rows="3" placeholder="Bu var ya ..."></textarea>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <button class="btn btn-sm btn-secondary me-2" @click="$router.push({ name: 'HomePage' })">İptal</button>
      <button class="btn btn-sm btn-primary" @click="onSave">Kaydet</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        title: null,
        url: null,
        description: null,
      },
    };
  },
  methods: {
    onSave() {
      console.log(this.userData);
      this.$appAxios.post("http://localhost:3000/bookmarks/", this.userData).then((save_response) => {
        console.log("save_response", save_response);
        this.resetData();
        this.$router.push("/");
        //burada pushladıktan sonra userData'yı silmemiz gerekiyor.
        //bunun için aşağıdaki gibi tek tek null yapmak yerine resetData() diye foreachli bir metot yazdık.


        // this.userData = {
        //   title: null,
        //   url: null,
        //   description: null,
        // };
      });
    },
    
    resetData(){
        Object.keys(this.userData).forEach(key =>(this.userData[key]=null));
    },
  },
};
</script>

````