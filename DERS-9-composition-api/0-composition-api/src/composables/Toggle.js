import { ref} from "vue";

export default function() {
    const show = ref(false);
    console.log("show", show.value);

    //Methods kullanımı arrow functionlı
    const toggleIt = () => {
      show.value = !show.value;
    };
    return{
        show,
        toggleIt

    };
}