const app = Vue.createApp({
  data() {
    return {
      title: "Vue.js Bootcamp 1. Gün",
      content: "Lorem ipsum dolor sit amet",
      eduflow: {
        title: "Müfredat ve açıklamalar için tıklayınız",
        target: "_blank",
        url: "https://www.google.com.tr",
        alt: "mufredat-google",
      },
      owner: "Pogaca",
      coords: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    changeTitle(_title) {
      //alert();
      this.title = _title;
    },
    updateCoords(message, event) {
//console.log(message, event.x, event.y);
        this.changeTitle(`${event.x},${event.y}`)
      this.coords = {
        x: event.x,
        y: event.y,
      };
    },
  },
}).mount("#app");
