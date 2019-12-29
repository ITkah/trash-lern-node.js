const сalendar = new Vue({
    el: '#app',
    data: {
        nameUser: '',
        ageUser: '',
        priceUser: '',
        output: null,
        button: 'Отправить'
    },
    async created() {
        this.output = (await new Promise((cb) => axios.get('/get/users')
            .then(cb)
            .catch(error => console.log(error)))).data;
    },
    methods: {
        sendForm() {
            axios
                .post(`/post/userNew`, {
                    name: this.nameUser,
                    age: this.ageUser,
                    price: this.priceUser
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updateUser(id,name,age,price) {
            this.nameUser = name;
            this.ageUser = age;
            this.priceUser = price;
            this.button = "Редактировать";
        },
        deleteUser(id) {
            let deleteUser = id;
            axios
                .post(`/post/deleteUser`, {
                    id: deleteUser,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
});