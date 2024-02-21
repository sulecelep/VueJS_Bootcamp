# Composition API

## Neden Composition API Kullanmalıyız?

- Composition API’den önce Vue projelerinde geliştirmelerimizi Options API ile yapıyorduk. Options API ile birlikte kodlarımızın daha net ve anlaşılır olduğunu düşünüyorduk. Bunun sebebi ise yazacağımız kodun kendi yeri var ve neyi nereye eklememiz gerektiğini biliyorduk(data, computed, methods vb).
- Küçük projeler için düşünüldüğünde iyi bir çözüm gibi duruyor olsa da bu durumun geliştirilen uygulama küçük ve basit olduğunda geçerli olduğunu söyleyebiliriz.
- Reactivity özelliği taşıyan variableların sayfaya yük bindirmesi.
- Aşağıdaki kod örneğinde de solda Options API ile yazılan bir kodun Composition API ile nasıl yazılabileceğini görebilirsiniz.
  ![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--ozc_mtyg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ta1jyozo9mewq7y9kjdd.png)

## Vite Nedir?

Vite browser'ın yaptığı işleri yapmayarak daha performanslı kullanım sağlıyor.
Vite.js projenizin bağımlı olduğu NPM paketlerini ayrı, kaynak dosyalarını ayrı kefede tutuyor. Bağımlılıkları önbellek(cache) mekanizmasında tutarken, kaynak dosyalarınızı HMR ile değişime hazır şekilde çalıştırıyor. Her değişiklikte bağımlılıkları da taramak yerine sadece kaynak dosyalarınıza odaklanıyor. Yalnızca ekranda görüntülenen, içe aktarılan kodu derler. Böylelikle siz sadece projenize odaklanıp Vite.js sayesinde hızlı bir geliştirme imkanı yakalayabilirsiniz.

Vite.js hızını ES modül yapısından alıyor diyebiliriz. Bir şeyler değiştiğinde tüm paketi yenilemesi gerekmediği için geliştirme esnasında hızlı bir sonuç veriyor. Bu özelliğiyle büyük projelerde geliştirme sürecinin kısalmasını sağlıyor.

## Projeye Dahil Edilenler

- Vite ile proje oluşturmak

```
npm init vite@latest
```

- Tailwind'ı projeye dahil etmek
  > Tailwind'ın Vue+Vite için olan dokümantasyonu için: [tıklayınız](https://tailwindcss.com/docs/guides/vite#vue)

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Setup Metodu

Options api ile composition api'yi birlikte kullanmak isteyenler için setup metodu var.

setup => beforeCreate ve created lifecycle hookları içinde kapsıyor.

## ref Kullanımına Neden İhtiyaç Var?

referans tipli değişken oluşturmak istiyorsak ref ile değişken oluşturuyoruz.

## Composition API'de Method Kullanımı

> **const onSave=()=>{}**
> veya
> **function onSave(){}**

ÖRNEK:

```js
import { ref } from "vue";

export default {
  setup() {
    const title = ref("Bu bir ref başlık");
    const show = ref(false);
    console.log("show", show.value);

    const toggleIt = () => {
      show.value = !show.value;
    };

    return {
      title,
      show,
      toggleIt,
    };
  },
};
```

## Computed Kullanımı

computed: fonksiyon gibi kullanılan değişkenlerdir

```js
import { ref, computed } from "vue";

export default {
  setup() {
    const title = ref("Bu bir setup başlık skhgdfshgd");

    //computed kullanımı // computed: fonksiyon gibi kullanılan değişkenlerdir

    const titleLengthMessage = computed(() => {
      return title.value.length + " adet karakter yazdınız";
    });

    return {
      title,
      titleLengthMessage,
    };
  },
};
```

## Watch Kullanımı

watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor.

```js
import { ref, computed, watch } from "vue";

export default {
  setup() {
    const counter = ref(0);
    const oddOrEven = computed(() => (counter.value % 2 == 0 ? "çift" : "tek")); // computed ile çift mi tek mi yazdıran metot oluşturduk

    //watch kullanımı //watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor

    watch([counter, oddOrEven], ([newC, newO], [oldC, oldO]) => {
      console.log(newO, " => ", oldO);
    });

    return {
      counter,
      oddOrEven,
    };
  },
};
```

## watchEffect Kullanımı

içinde bulunan değişkene göre tetikleniyor.

```js
import { ref, computed, watch, watchEffect } from "vue";

export default {
  setup() {
    const searchText = ref("");
    const isTyping = ref(false);

    //watchEffect //içinde bulunan değişkene göre tetikleniyor.

    const stop = watchEffect((onInvalidate) => {
      if (searchText.value.length > 0) {
        isTyping.value = true;
        const typing = setTimeout(() => {
          isTyping.value = false;
          stop();
        }, 1500);

        onInvalidate(() => {
          //yazarken setTimeout sürekli sekerek ilerliyordu, bu metot ile bunu düzelttik
          clearTimeout(typing);
        });
      } else {
        isTyping.value = false;
      }
    });
    return {
      searchText,
      isTyping,
    };
  },
};
```

## Composables

Her bir componentin js dosyasını ayrı bir scriptte tutmaya composables deniliyor.

### Counter.js

```js
import { ref, computed, watch } from "vue";

export default function () {
  const counter = ref(0);
  const oddOrEven = computed(() => (counter.value % 2 == 0 ? "çift" : "tek")); // computed ile çift mi tek mi yazdıran metot oluşturduk

  //watch kullanımı //watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor

  watch([counter, oddOrEven], ([newC, newO], [oldC, oldO]) => {
    console.log(newO, " => ", oldO);
  });

  return {
    counter,
    oddOrEven,
  };
}
```

### Header.js

```js
import { ref, computed } from "vue";

export default function () {
  const title = ref("Bu bir setup başlık skhgdfshgd");
  //computed kullanımı // computed: fonksiyon gibi kullanılan değişkenlerdir
  const titleLengthMessage = computed(() => {
    return title.value.length + " adet karakter yazdınız";
  });
  console.log("titleLengthMessage", titleLengthMessage.value);

  return {
    title,
    titleLengthMessage,
  };
}
```

### Search.js

```js
import { ref, watchEffect } from "vue";

export default function () {
  const searchText = ref("");
  const isTyping = ref(false);

  //watchEffect //içinde bulunan değişkene göre tetikleniyor.

  const stop = watchEffect((onInvalidate) => {
    if (searchText.value.length > 0) {
      isTyping.value = true;
      const typing = setTimeout(() => {
        isTyping.value = false;
        stop();
      }, 1500);

      onInvalidate(() => {
        //yazarken setTimeout sürekli sekerek ilerliyordu, bu metot ile bunu düzelttik
        clearTimeout(typing);
      });
    } else {
      isTyping.value = false;
    }
  });
  return {
    searchText,
    isTyping,
  };
}
```

### Toggle.js

```js
import { ref } from "vue";

export default function () {
  const show = ref(false);
  //Methods kullanımı arrow functionlı

  const toggleIt = () => {
    show.value = !show.value;
  };
  return {
    show,
    toggleIt,
  };
}
```

### App.vue'nun scriptinde composable'daki scriptlerin birleştirilmesi

Yukarıdaki composables'ların yani component js olarak da düşünebiliriz bunları, kullandığımız sayfanın scriptinde bu şekilde import ediyoruz.
Sonrasında script setup yaptığımızda bu yapı da değişecek, bu örnek script'in içinde ayrı bir setup metodu açınca geçerlidir.

```js
import Counter from "./composables/Counter.js";
import Header from "./composables/Header.js";
import Search from "./composables/Search.js";
import Toggle from "./composables/Toggle.js";

export default {
  setup() {
    const { counter, oddOrEven } = Counter();
    const { title, titleLengthMessage } = Header();
    const { searchText, isTyping } = Search();
    const { show, toggleIt } = Toggle();

    return {
      title,
      show,
      toggleIt,
      titleLengthMessage,
      counter,
      oddOrEven,
      searchText,
      isTyping,
    };
  },
};
```

## Script Setup Kullanımı

**\*script setup** lifecycle hooks olarak beforeCreate(), created(), ve data() yerine geçiyor\*
_App.vue ana component, oddOrEven counter sayacını taşıyan child component. Utils ise App.vue'nun içindeki functionları içinde barındıran bir js dosyası. **script setup'ta => defineProps, defineEmit, computed, watch, onMounted, reactive** kullanımını buradan inceleyebiliriz._

### App.vue

```html
<template>
  <h3>{{ title }}</h3>

  <input type="text" v-model="title" />

  <button @click="inc">{{ counter }}</button>

  <hr />

  <oddOrEven :counter="counter" @odd-event="alertMe" />

  <hr />

  <h1>User App</h1>

  <input type="text" v-model="state.personal.name" />

  <input type="text" v-model="state.personal.lname" />

  {{ state.personal }}
</template>
```

### App.vue script setup

```js
<script setup>

import  {ref, reactive,watch}  from  "vue";

import oddOrEven from  "./components/oddOrEven.vue";

import Utils from  "./composables/Utils.js";



const  { title, counter, inc, alertMe }=Utils();



// User App



const state=  reactive({

personal:{

name:null,

lname:null,



},

});



// () =>JSON.parse(JSON.stringify(state.personal))

watch(()  =>JSON.parse(JSON.stringify(state.personal)),  (newPersonal,oldPersonal)=>{

console.log(oldPersonal);

console.log(newPersonal);

})




</script>
```

### oddOrEven.vue

```html
<template>
  <h3>{{ result }}</h3>

  {{ counter }}
</template>
```

### oddOrEvent script setup

```js
<script setup>

import  { computed, watch }  from  "vue";

const props =  defineProps({  counter: Number });

const emit =  defineEmits(["odd-event"]);



const result =  computed(()  =>  {

return props.counter  %  2  ==  0  ?  "Çift"  :  "Tek";

});



//tek olduğunda event gönderelim

watch(result,  (result)  =>  {

if  (result ===  "Tek")  {

emit("odd-event",  true);

}

});

</script>
```

### Utils.js composable dosyası

```js
import { ref, onMounted } from "vue";

export default function () {
  const title = ref("Başlık");

  const counter = ref(0);

  const inc = () => {
    counter.value++;
  };

  const alertMe = (info) => {
    console.log(info);
  };

  onMounted(() => {
    console.log("Mounted esnasında yapılabilecekler burada ...");
  });

  return { title, counter, inc, alertMe };
}
```

## Reactive Neden Kullanılır?

_Bir object veya array kullanmak istediğimiz zaman **ref({ })** kullanılması tercih edilmiyor. Onun yerine reactive kullanabiliriz. ViewModel gibi de düşünebiliriz._

```js
import  { reactive, provide, watch }  from  "vue";
import invoiceItems from  "./invoiceItems.vue";
import invoiceSummary from  "./invoiceSummary.vue";
import contactSection from  "./contactSection.vue";

const props=  defineProps({saveInvoice : Function,  activeInvoice:[Object,null]})
const data =  reactive({

    id:  null,
    created_at:null,
    contact:  {
        contact_name:  null,
        email:  null,
        city:  null,
        country:  null,
        zipcode:  null,
    },

    items:  [],

});

const  AddInvoiceItem  =  ()  =>  {

    data.items.push({

        id:  new  Date().getTime(),

        name:  null,

        qty:  null,

        unit_price:  0.0,

        total_price:  0.0,

    });

};


const DeleteInvoiceItem  =  (invoiceItem)  =>  {
    data.items  = data.items.filter((i)  => i.id  != invoiceItem.id);
};



provide("DeleteInvoiceItem",  DeleteInvoiceItem);


const  onSubmit  =  ()  =>  {

    props.saveInvoice({...data,  created_at:  new  Date(),  id:  new  Date().getTime()});

    data.contact  ={

        contact_name:  null,

        email:  null,

        city:  null,

        country:  null,

        zipcode:  null,

    };

    data.items=[];

};



watch(()=>props.activeInvoice,(activeInvoice)=>{

    if(activeInvoice)
    {
        data.contact=  {...activeInvoice.contact};
        data.items=  [...activeInvoice.items];
    }
});


```
