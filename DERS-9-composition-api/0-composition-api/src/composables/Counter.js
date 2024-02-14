import { ref, computed,watch} from "vue";

export default function (){
    const counter = ref(0);
    const oddOrEven = computed(() => (counter.value % 2 == 0 ? "çift" : "tek")); // computed ile çift mi tek mi yazdıran metot oluşturduk

    //watch kullanımı //watch geriye bir şey döndürmekten ziyade eski değer ile yeni değeri izliyor
    watch([counter, oddOrEven], ([newC, newO], [oldC, oldO]) => {
      console.log(newO, " => ", oldO);
    });
  
      return {
        counter,
        oddOrEven
      }
}