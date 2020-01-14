const сalendar = new Vue({
    el: '#app',
    data: {
        id: '',
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
                    this.output = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sendUser() {
            axios
                .put(`/user`, {
                    id: this.id,
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
        updateUser() {
            this.id = id;
            this.nameUser = name;
            this.ageUser = age;
            this.priceUser = price;
            this.button = "Редактировать";
        },
        deleteUser(id) {
            let idUser = id;
            alert(idUser);
            axios
                .delete(`/user`, {
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