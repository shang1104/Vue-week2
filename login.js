import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const url = `https://vue3-course-api.hexschool.io`;
const path = `shang801104`;

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${expired}`;
          window.location = "products.html"; //todo 進入products的網頁
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
