import { ref, computed} from "vue";

export default function (){
    const title = ref("Bu bir setup başlık skhgdfshgd");

     //computed kullanımı // computed: fonksiyon gibi kullanılan değişkenlerdir
    const titleLengthMessage = computed(() => {
        return title.value.length + " adet karakter yazdınız";
      });
  
      console.log("titleLengthMessage", titleLengthMessage.value);
      return {
        title,
        titleLengthMessage

      }
}