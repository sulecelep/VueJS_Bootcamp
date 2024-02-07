# Vuex4 ile State Management

## Vuex Neden Kullanılır?
*Vuex bir state management tooludur. Uygulama seviyesinde bütün sayfa ve componentlerin bilgi paylaşması istenirse burada Vuex kullanılmalıdır.*

*Data'yı Vuex'de mi yoksa Component'te mi tutmak istiyoruz öncelikle ona karar vermeliyiz*

*Data'yı başka bir Component kullanacaksa ve seviyesi çağırdığımız Componentle aynı değilse(parent child anlamında) Vuex'da tutmalıyız*



## Vuex'un Projeye Dahil Edilmesi
*Vuex dokümantasyonu için [tıklayınız](https://vuex.vuejs.org/)*



*Terminalde npm kodunu çalıştırıyoruz ve Vuex paketi yükleniyor*

```npm install vuex@next```

## Store'un Oluşturulması

*Vuex global olarak bütün uygulama seviyesinde erişilebilir bir yapı sunar, bu yapının adına ***store*** denir.*
*Burada tutacağımız bilgiler state olarak adlandırılıyor, dolayısıyla burada stateleri tanımlayacağız.*

**src klasöründe store.js dosyası oluşturuldu.**

*Vue DevTools dokümantasyonu için [tıklayınız](https://devtools.vuejs.org/)*

*Vuejs DevTools eklentisi google chrome'a eklendi. F12 yaptığımızda componentleri eventları buradan izleyebiliyoruz* 

## Component Üzerinden Store'a Erişim Sağlamak

### App
````html
<template>


  <ul>
    <li v-for="item in $store.state.permissions" :key="item">{{ item }}</li>
  </ul>

  <ul>
    <li v-for="item in $store.state.userList" :key="item">{{ item }}</li>
  </ul>

</template>
<script>

export default {
  created(){
    console.log(this.$store.state.userList);
  },
  methods:{
    updateName(){
      this.$store.state.fullName=new Date().getTime();
    },
  },
}
</script>

````
### main.js
````js
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import "@/assets/style.css"

const app= createApp(App)
app.use(store)
app.mount('#app')

````
### store.js
````js
import { createStore } from "vuex";

const store=createStore({
    state:{
        fullName:"Şule Celep",
        permissions:[1,2,3,4,5,6],
        userList:[
            "Gökhan",
            "Tayfun",
            "İlker",
            "Ramazan",
            "Defne",
            "Kamil",
            "Cemil",
        ],

    }
});

export default store;

````

## Component Üzerinden Getter'a Erişim

### App
````html
<template>
  <p>
  {{ $store.state.permissions }}

  <ul>
    <li v-for="(item,index) in $store.getters.woodItems" :key="item">{{ item.title }}</li>
  </ul>
  <button @click="updateName">FullName bilgisini değiştir.</button>
</p>
</template>

<script>

export default {
  created(){
    console.log(this.$store.state.person);
    console.log(this.$store.state.theme);
    console.log(this.$store.getters.woodItems);
    console.log(this.$store.getters.activeUser);
  },
  methods:{
    updateName(){
      this.$store.state.itemList.push({id:6,title:"Raf", type:"mobilya"});

    },
  },
}
</script>

````

### store.js
````js
import { createStore } from "vuex";

const store=createStore({
    state:{
        user:{
            name:"Gökhan",
            lname:"Kandemir",
            age:29,
            address:{},
            password: 123123123,
            tc: 11111,

        },
        theme:"dark",
        permissions:[1,2,3,4,5,6],
        userList:[
            "Gökhan",
            "Tayfun",
            "İlker",
            "Ramazan",
            "Defne",
            "Kamil",
            "Cemil",
        ],
        fullName:"Şule Celep",
        itemList:[
            {id:1,title:"Masa", type:"mobilya"},
            {id:2,title:"Sandalye", type:"mobilya"},
            {id:3,title:"TV", type:"elektronik"},
            {id:4,title:"Monitör", type:"elektronik"},
            {id:5,title:"Bardak", type:"plastik"},
        ],
        
    },
    getters:{
        woodItems: state => state.itemList.filter(i=>i.type==="mobilya"),
        activeUser(state){
            const user = {
                ...state.user
            };
            delete user.password;
            return user;
        },

    }, 
});

export default store;

````

## Getter'ı Computed ile Kullanmak ve mapGetters

### App

````html
<template>
  <p>

  <ul>
    <li v-for="(item,index) in woodItems" :key="item">{{ item.title }}</li>
  </ul>
  {{ this.activeUser}}
</p>
</template>

<script>
import { mapGetters } from 'vuex';


export default {

  computed: {
    //...mapGetters(["woodItems", "activeUser"]), //1. mapGetters syntax'ı
    ...mapGetters({
      woodItems:"_woodItems",
      activeUser:"_activeUser"
    }),
    // customComputed(){
    // },
  }
}
</script>

````

## mutation ile State'i Güncellemek
*mutation: çok hızlı şekilde state'i senkron olarak günceller. database'den gelen veride küçük bir gecikme olursa güncellemeyebilir yani boş şekilde günceller*


### store.js
````js
import { createStore } from "vuex";

const store=createStore({
    state:{

        itemList:[
            {id:1,title:"Masa", type:"mobilya"},
            {id:2,title:"Sandalye", type:"mobilya"},
            {id:3,title:"TV", type:"elektronik"},
            {id:4,title:"Monitör", type:"elektronik"},
            {id:5,title:"Bardak", type:"plastik"},
        ],
        
    },
    mutations:{
        newItem(state,item){
            state.itemList.push(item);
        },
        

    },
    getters:{
        _woodItems: state => state.itemList.filter(i=>i.type==="mobilya"),

    }, 
});

export default store;

````

### NewUser
````html
<template>
      <button @click="updateName"> Yeni item Ekle</button>

</template>

<script>
 
 export default {
    methods:{
    updateName(){
      const userData={id: new Date().getTime(),title:"Raf"+new Date().getTime(), type:"mobilya"};
      this.$store.commit("newItem",userData) 

    },
  },
 }

</script>
````


## Actions Nedir Nasıl Tanımlanır?
*actions: mutation'dan farklı olarak state'i asenkron olarak günceller.*
*context: vuex'teki herhangi bir infoya erişmek için kullanılır, vuex nesnesi gibi düşünebiliriz*
*Action'lar dispatch edilir. Mutation'lar Commit edilir.*

### store.js
````js
import { createStore } from "vuex";

const store=createStore({
    state:{
        itemList:[
            {id:1,title:"Masa", type:"mobilya"},
            {id:2,title:"Sandalye", type:"mobilya"},
            {id:3,title:"TV", type:"elektronik"},
            {id:4,title:"Monitör", type:"elektronik"},
            {id:5,title:"Bardak", type:"plastik"},
        ],
        
    },
    mutations:{
        newItem(state,item){
            state.itemList.push(item);
        },


    },
    actions:{
        newItem(context,item){
            console.log('item', item)
            setTimeout(()=>{
                context.commit("newItem",item);

            },2000);
        }

    },
    getters:{
        _woodItems: state => state.itemList.filter(i=>i.type==="mobilya"),
        _activeUser(state){
            const user = {
                ...state.user
            };
            delete user.password;
            return user;

        }

    }, 
});

export default store;

````

### NewUser
````html
<template>
      <button @click="updateName"> Yeni item Ekle</button>

</template>

<script>
 
 export default {
    methods:{
    updateName(){
        const userData={id: new Date().getTime(),title:"Raf"+new Date().getTime(), type:"mobilya"};
      //this.$store.commit("newItem",userData);
        this.$store.dispatch("newItem", userData);

    },
  },
 }

</script>
````

## Vuex Modules Yapısı

*Burada index.js'deki store'u modullere ayırarak kullanım kolaylığı sağlanıyor.*

### App.vue
````html
<template>
  <p>
    {{ $store.state.mainName }}
  </p>

  <p>
    {{ $store.state.musteri.contactName }}
  </p>

  <pre>
    {{musteriADI}}
  </pre>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  created(){
    console.log(this.$store.getters["musteri/_contactName"]); //namespaced yaptığımız için 
    console.log(this.$store);
  },
  computed:{
    ...mapGetters({
      musteriADI:"musteri/_contactName",
    })
  }
}
</script>

````

### index.js
````js
import { createStore } from "vuex";
import contact from "./modules/contact"
import taskmanager from "./modules/taskmanager"
const store= createStore({
    namespaced:true,
    state:{
        mainName:"kablosuzkedi"
    },
    mutations:{

    },
    modules:{
        musteri:contact,
        taskmanager,

    }
});

export default store;

````

### contact.js modülü
````js
export default {
    namespaced:true,

  state: {
    contactName: "puresol",
    contactAddress: "Kanada",
    propertyList: []
  },
  mutations: {
    setItem(state, name) {
      state.contactName = name;
    },
  },
  getters:{
    _contactName: state => state.contactName,
    //_itemList: state=>state.propertyList,
  }
};


````
### taskmanager.js modülü
````js
/* bunlar birer module store değil o yüzden import createStore yapmadık */

export default {
    namespaced:true,

    state:{
        itemList:[{}],
        userList:[{}],
    },
    mutations:{
        setItem(state,item){
            state.itemList.push(item);
        },
    },
    getters:{
        _itemList: state => state.itemList,
    }
}

````

