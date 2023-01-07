import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  //資料
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "shang801104",
      products: [],
      tempProduct: {},
    };
  },
  //  方法集
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "index.html"; // todo 回登入頁面
        });
    },
    getData() {
      axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then((response) => {
          console.log(response.data);
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  //生命週期
  mounted() {
    //取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
}).mount("#app");
