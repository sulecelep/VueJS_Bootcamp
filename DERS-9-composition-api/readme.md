
# Composition API

## Neden Composition API Kullanmalıyız?
* Composition API’den önce Vue projelerinde geliştirmelerimizi Options API ile yapıyorduk. Options API ile birlikte kodlarımızın daha net ve anlaşılır olduğunu düşünüyorduk. Bunun sebebi ise yazacağımız kodun kendi yeri var ve neyi nereye eklememiz gerektiğini biliyorduk(data, computed, methods vb).
* Küçük projeler için düşünüldüğünde iyi bir çözüm gibi duruyor olsa da bu durumun geliştirilen uygulama küçük ve basit olduğunda geçerli olduğunu söyleyebiliriz.
* Reactivity özelliği taşıyan variableların sayfaya yük bindirmesi.
* Aşağıdaki kod örneğinde de solda Options API ile yazılan bir kodun Composition API ile nasıl yazılabileceğini görebilirsiniz.
![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--ozc_mtyg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ta1jyozo9mewq7y9kjdd.png)


## Vite Nedir?
Vite browser'ın yaptığı işleri yapmayarak daha performanslı kullanım sağlıyor.
Vite.js projenizin bağımlı olduğu NPM paketlerini ayrı, kaynak dosyalarını ayrı kefede tutuyor. Bağımlılıkları önbellek(cache) mekanizmasında tutarken, kaynak dosyalarınızı HMR ile değişime hazır şekilde çalıştırıyor. Her değişiklikte bağımlılıkları da taramak yerine sadece kaynak dosyalarınıza odaklanıyor. Yalnızca ekranda görüntülenen, içe aktarılan kodu derler. Böylelikle siz sadece projenize odaklanıp Vite.js sayesinde hızlı bir geliştirme imkanı yakalayabilirsiniz.

Vite.js hızını ES modül yapısından alıyor diyebiliriz. Bir şeyler değiştiğinde tüm paketi yenilemesi gerekmediği için geliştirme esnasında hızlı bir sonuç veriyor. Bu özelliğiyle büyük projelerde geliştirme sürecinin kısalmasını sağlıyor.

## Projeye Dahil Edilenler

* Vite ile proje oluşturmak
````
npm init vite@latest
````

* Tailwind'ı projeye dahil etmek
> Tailwind'ın Vue+Vite için olan dokümantasyonu için: [tıklayınız](https://tailwindcss.com/docs/guides/vite#vue)

````
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
````

## Setup Metodu
Options api ile composition api'yi birlikte kullanmak isteyenler için setup metodu var.

setup => beforeCreate ve created lifecycle hookları içinde kapsıyor.

## ref Kullanımına Neden İhtiyaç Var?
referans tipli değişken oluşturmak istiyorsak ref ile değişken oluşturuyoruz.

## Composition API'de Method Kullanımı

> **const  onSave=()=>{}**
veya 
**function  onSave(){}**


ÖRNEK:
````js

import  {ref}  from  "vue";

export  default  {

	setup() {
		const title =ref("Bu bir ref başlık");
		const show=  ref(false);
		console.log('show', show.value)

		const  toggleIt  =  ()  =>  {
		show.value  =  !show.value;
		};

		return  {
			title,
			show,
			toggleIt,
		};
	},
};
````

## Computed Kullanımı
computed: fonksiyon gibi kullanılan değişkenlerdir

````js
import  {ref, computed}  from  "vue";
  
export  default  {

	setup()  {

		const title =ref("Bu bir setup başlık skhgdfshgd");

		//computed kullanımı // computed: fonksiyon gibi kullanılan değişkenlerdir

		const titleLengthMessage =  computed  (()  =>  {

			return title.value.length  +  " adet karakter yazdınız"

		});

		return  {
			title,
			titleLengthMessage,
		};
	},
};
````

## Watch Kullanımı
watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor.

````js
import  {ref, computed, watch}  from  "vue";

export  default  {

setup()  {

	const counter =  ref(0);
	const oddOrEven =  computed(()  =>  (counter.value%2  ==0?  'çift'  :  'tek'));  // computed ile çift mi tek mi yazdıran metot oluşturduk

	//watch kullanımı //watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor

	watch([counter,oddOrEven],  ([newC,newO],[oldC,oldO])=>{
		console.log(newO," => "  ,oldO);
	});

	return  {
		counter,
		oddOrEven
		};
	},
};
````

##  watchEffect Kullanımı
içinde bulunan değişkene göre tetikleniyor.

````js
import  { ref, computed, watch, watchEffect }  from  "vue";

export  default  {
		setup()  {
		const searchText =  ref("");
		const isTyping =  ref(false);

		//watchEffect //içinde bulunan değişkene göre tetikleniyor.

		const stop =  watchEffect((onInvalidate)  =>  {

			if  (searchText.value.length  >  0)  {
				isTyping.value  =  true;
				const typing =  setTimeout(()  =>  {
					isTyping.value  =  false;
					stop();
					},  1500);

				onInvalidate(()=>{
					//yazarken setTimeout sürekli sekerek ilerliyordu, bu metot ile bunu düzelttik
					clearTimeout(typing);
				}); 
			}else{
				isTyping.value  =  false;
				}
			});
		return  {
			searchText,
			isTyping,
		};
	},
};
````
## Composables
Her bir componentin js dosyasını ayrı bir scriptte tutmaya composables deniliyor.
### Counter.js
````js
import  { ref, computed,watch}  from  "vue";

	export  default  function  (){

		const counter =  ref(0);
		const oddOrEven =  computed(()  =>  (counter.value  %  2  ==  0  ?  "çift"  :  "tek"));  // computed ile çift mi tek mi yazdıran metot oluşturduk
		
		//watch kullanımı //watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor

		watch([counter, oddOrEven],  ([newC, newO],  [oldC, oldO])  =>  {
			console.log(newO,  " => ", oldO);
		});

		return  {
			counter,
			oddOrEven
		}
	}
````

### Header.js
````js
import  { ref, computed}  from  "vue";

export  default  function  (){
	const title =  ref("Bu bir setup başlık skhgdfshgd");
	//computed kullanımı // computed: fonksiyon gibi kullanılan değişkenlerdir
	const titleLengthMessage =  computed(()  =>  {
		return title.value.length  +  " adet karakter yazdınız";
	});
	console.log("titleLengthMessage", titleLengthMessage.value);

	return  {
		title,
		titleLengthMessage
	}
}
````

### Search.js
````js
import  { ref, watchEffect }  from  "vue";

export  default  function()  {
	const searchText =  ref("");
	const isTyping =  ref(false);

	//watchEffect //içinde bulunan değişkene göre tetikleniyor.

	const stop =  watchEffect((onInvalidate)  =>  {

		if  (searchText.value.length  >  0)  {
			isTyping.value  =  true;
			const typing =  setTimeout(()  =>  {
				isTyping.value  =  false;
				stop();
			},  1500);
			
			onInvalidate(()=>{
				//yazarken setTimeout sürekli sekerek ilerliyordu, bu metot ile bunu düzelttik
				clearTimeout(typing);
			});
		}else{
			isTyping.value  =  false;
		}
	});
	return{
		searchText,
		isTyping,
	};
}

````

### Toggle.js
````js
import  { ref}  from  "vue";

export  default  function()  {

	const show =  ref(false);
	//Methods kullanımı arrow functionlı

	const  toggleIt  =  ()  =>  {
		show.value  =  !show.value;
	};
	return{
		show,
		toggleIt
	};

}

````

### App.vue'nun scriptinde composable'daki scriptlerin birleştirilmesi
Yukarıdaki composables'ların yani component js olarak da düşünebiliriz bunları, kullandığımız sayfanın scriptinde bu şekilde import ediyoruz.
Sonrasında script setup yaptığımızda bu yapı da değişecek, bu örnek script'in içinde ayrı bir setup metodu açınca geçerlidir.

````js
import Counter from  "./composables/Counter.js";
import Header from  "./composables/Header.js";
import Search from  "./composables/Search.js";
import Toggle from  "./composables/Toggle.js";

export  default  {

	setup()  {
		const  { counter, oddOrEven}  =  Counter();
		const  { title, titleLengthMessage}  =  Header();
		const  { searchText, isTyping}  =  Search();
		const  { show, toggleIt}  =  Toggle();

		return  {
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
````
