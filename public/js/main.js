const сalendar = new Vue({
    el: '#app',
    data: {
        nameUser: '',
        ageUser: '',
        priceUser: '',
        output: null,
        button: 'Отправить'
    },
    created() {
        axios.get('/get/users')
            .then(response => (this.output = response.data))
            .catch(error => (console.log(error)));
    },
    methods: {
        sendForm() {
            axios
                .post(`/post/userNew`, {
                    body: {
                        nameUser: this.nameUser,
                        ageUser: this.ageUser,
                        priceUser: this.priceUser
                    }
                })
                .then((response) => {
                    console.log(response.data.body);
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
        }
    },
});