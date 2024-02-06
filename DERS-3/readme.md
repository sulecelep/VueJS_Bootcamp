# Vue JS Provide Inject

## Parent'tan Child'a Veri Göndermek 

*App.vue parent, UserSection.vue ise child component*

### App.vue
````html

<template>
  <div class="container">
    <UserSection :userList="userList"/>
    
  </div>
</template>

<script>
import UserSection from "@/components/UserSection"
export default {
  components:{
    UserSection,
  },
  data(){
    return{
      userList:["Tayfun","Gökhan","Defne","Handan","Aslı"],
    };
  }
  
}
</script>
````
### UserSection.vue
````html

<template>
    <ul>
        <li v-for="user in userList" :key="user">{{ user }}</li>
    </ul>
</template>

<script>
export default{
    props:["userList"],
    
}
</script>
````
## Child'dan Parent'a Veri Göndermek 

*Child'dan Parent'a veri gönderirken, custom event kullanıyoruz.*


### App.vue
````html

<template>
  <div class="container">
    <UserSection :userList="userList" @new-item="userList.push($event)"/>
    
  </div>
</template>

<script>
import UserSection from "@/components/UserSection"
export default {
  components:{
    UserSection,
  },
  data(){
    return{
      userList:["Tayfun","Gökhan","Defne","Handan","Aslı"],
    };
  }
  
}
</script>
````
### UserSection.vue
````html

<template>
    <ul>
        <li v-for="user in userList" :key="user">{{ user }}</li>
    </ul>
    <button @click="$emit('new-item', new Date().getTime())">Set Data</button>
</template>

<script>
export default{
    props:["userList"],
</script>
````
## Provide Inject Mantığıyla Veri Göndermek 

*App provider, diğer componentler consumer (UserSection.vue, ListSection ve AddSection)*

*App provider componentinde tanımladığımız providerData ve newItem metodunu provide ile diğer componentlerin kullanması için dışa açıyoruz. Sonrasında bu data'yı istediğimiz componentte inject edip kullanabiliyoruz.*

### App.vue
````html

<template>
  <div class="container">
    <UserSection  />
  </div>
</template>

<script>
import UserSection from "@/components/UserSection"
export default {
  components:{
    UserSection,
  },
  data(){
    return{
      provideData:{
        userList:["Tayfun","Gökhan","Defne","Handan","Aslı"],
      }
    };
  },
  methods:{
    newItem(item){
      this.provideData.userList.push(item);
    },
  },
  provide(){
    return{
        userList:this.provideData.userList,
        newItem: this.newItem
    }
  },
}
</script>

````
### UserSection.vue
````html

<template>
    <ListSection />
    <AddSection />
</template>

<script>
import ListSection from "@/components/ListSection"
import AddSection from "@/components/AddSection"

export default{
    components:{
        ListSection,
        AddSection,
    }
};
</script>
````

### ListSection.vue
````html

<template>
    <ul>
        <li v-for="user in userList" :key="user">{{ user }}</li>
    </ul>
</template>

<script>
export default{
    inject:["userList"]
}
</script>
````
### AddSection.vue
````html

<template>
        <button @click="newItem(new Date().getTime())">Set Data</button>

</template>
<script>
export default{
    inject:["newItem"]
}
</script>
````

# Vue JS Component Slots

## Slots
*Componentin içerisine bilgi göndermeye yarar.*


### App.vue
````html

<template>

  <Modal>
    <template #title>
      <h3>Slots ile Gelen Title Bilgisi</h3>
    </template>
    <template #content>
      <p class="text-green">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, rerum.</p>
    </template>
    <template #default>
        Bu default olarak gösterilecek.
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  data() {
    return {
      content: `<h3 class="text-red">title</h3>`,
    };
  },
  components: {
    Modal,
  },
  methods: {
    onSave() {
      alert("Saved!!");
    },
  },
};
</script>

````


### Modal.vue
````html

<template>
  <div class="container">
    <div class="header">
        <slot name="title" />
    </div>
    <hr>
    <div class="content my-2" >
        <slot name="content" />
    </div>
    <slot/>     /*default*/
    <hr>
    <div class="footer text-right">
      <button class="mr-2">Kapat</button>
      <button @click="onSave" class=" ml-2 green">Kaydet</button>
    </div>
  </div>
</template>

<script>
export default {
    props:["onSave","title","content"]
}
</script>

````

# Vue JS Dinamik Componentler

*Dinamik components(bileşenler),kullanıcılara herhangi bir routing işlemi yapmadan birden fazla bileşen içerisinde geçiş yapmasına ve geçiş yaparken bilgilerin korunmasını sağlayan bileşenlerdir.*

*<KeepAlive> componenti, dinamik componentlerin içindeki verileri, componentler etkin olmadıklarında önbelleğe almak ve böylece durumlarının korunmasını sağlamak için kullanılır.*


### App.vue
````html

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <button class="red" @click="activeComponent = 'Red'">Red</button>

      <button class="green" @click="activeComponent = 'Green'">Green</button>
      <button class="blue" @click="activeComponent = 'Blue'">Blue</button>
    </div>

    <!-- <Red v-if="activeComponent == 'Red'" class="mb-2"></Red>
    <Green v-if="activeComponent == 'Green'" class="mb-2"></Green>
    <Blue v-if="activeComponent == 'Blue'" class="mb-2"></Blue> -->
    <keep-alive>
      <component :is="activeComponent" msg="Red Component 2">
        <h3 class="bg-green text-white">Green Component</h3>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import Red from "./components/Red.vue";
import Green from "./components/Green.vue";
import Blue from "./components/Blue.vue";

export default {
  name: "App",
  components: {
    Red,
    Green,
    Blue,
  },
  data() {
    return {
      activeComponent: "Red",
    };
  },
};
</script>

````
### Red.vue
````html

<template>
    <h3 class="bg-red text-white">{{msg}}</h3>
</template>

<script>
export default {
    props:["msg"],
    mounted(){
        console.log("RED mounted");
    }
}
</script>
````

### Green.vue
````html

<template>
    <slot/>
</template>
<script>
export default {
    mounted(){
        console.log("GREEN mounted");
    }
}
</script>
````
### Blue.vue
````html

<template>
    <h3 class="bg-blue text-white">Blue Component</h3>
    <input type="text">
</template>

<script>
export default {
    mounted(){
        console.log("BLUE mounted");
    },
    activated(){
        console.log("BLUE activated");
    },
    deactivated(){
        console.log("BLUE deactivated");
    },
}
</script>
````

# Axios ile Http İstekleri Atmak

[Fake API olarak kullanacağımız json-server github reposu için tıklayınız](*https://github.com/typicode/json-server*)

*Bilgisayara json-server paketini kurmamız gerekiyor:*
```
npm install json-server
```


*Projeye Axios dahil etmek için:*
```
npm install --save axios
```
*db.json dosyası oluşturup buraya json-server fakeAPI kullanarak ekle sil güncelle yapmak için localhost endpoint alıyoruz*
```
npx json-server db.json
```



