const сalendar = new Vue({
    el: '#app',
    data: {
        idUser: '',
        nameUser: '',
        ageUser: '',
        priceUser: '',
        output: null,
        button: 'Отправить',
        isEdit: false,
    },
    async mounted() {
        const response = await axios.get('/user');
        response.error && console.log(response.error);
        this.output = response.data;
    },
    methods: {
        sendForm() {
            this.isEdit ? this.sendUser() : this.newUser();
        },
        newUser() {
            axios
                .post(`/user`, {
                    name: this.nameUser,
                    age: this.ageUser,
                    price: this.priceUser
                })
                .then((response) => {
                    console.log(response);
                    console.log("new-user");
                    this.output = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sendUser() {
            axios
                .post(`/user/upgrade`, {
                    id: this.idUser,
                    name: this.nameUser,
                    age: this.ageUser,
                    price: this.priceUser
                })
                .then((response) => {
                    console.log(response);
                    this.output = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateUser(data) {
            this.isEdit = true;
            this.idUser = data.id;
            this.nameUser = data.name;
            this.ageUser = data.age;
            this.priceUser = data.price;
            this.button = "Редактировать";
        },
        deleteUser(id) {
            let idUser = id;
            axios
                .post(`/user/delete`, {
                    id: idUser,
                })
                .then((response) => {
                    console.log(response);
                    this.output = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
});