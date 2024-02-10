# BookLike Uygulaması

**Bu uygulamada neler yaptık?**
* Temayı componentlere ayırma
* Vue router projeye dahil edildi 
* Fake API'nin projeye dahil edilmesi
* Axios'un projeye dahil edilmesi ve custom axios oluşturulması
* Register -> CryptoJS ile kullanıcının şifresini şifreleme
* Login olan kullanıcının state üzerinde tutulması
* Login işlemine göre appHeader'ın düzenlenmesi
* vuex persistedstate paketinin projeye dahil edilmesi
* SecureLS paketinin projeye dahil edilmesi
* Route üzerinden authentication kontrolü

## Composition API Nedir?

*Options API'da computed, watch kullanıyorduk ve burada reactivity uygulama büyüdükçe yük bindirmeye başlıyordu*

*Sayfamda diyelim 20bin'den fazla reactivity değişken var. Yine performanslı çalışır ancak sıkıntı çıkarabilir*

*Composition API reactivity'i belirlememize imkan tanıyor*



## Projeye Dahil Edilen Paketlerin Terminal Kodları

* vou-router : 
````
npm install vue-router@4
````

* fake api
````
npx json-server db.json
````

* axios
````
npm install axios
````
* crypto.js
````
npm install crypto-js
````
* vuex
````
npm install vuex@next
````
