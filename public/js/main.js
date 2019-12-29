const сalendar = new Vue({
    el: '#app',
    data: {
        nameUser: '',
        ageUser: '',
        priceUser: '',
        output: null,
    },
    created() {
        axios.get('/get/users')
            .then(response => (this.output = response.data))
            .catch(error => (console.log(error)));
    },
    methods: {
        sendForm() {
            axios
                .post(`/userSend`, {
                    body: {
                        nameform: this.nameUser,
                        ageform: this.ageUser,
                        priceform: this.priceUser
                    }
                })
                .then((response) => {
                    console.log(response.data.body);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        edit(id,name,age,price) {
            this.nameUser = name;
            this.ageUser = age;
            this.priceUser = price;
            axios
                .post(`/userSend`, {
                    body: {
                        idUser: id,
                        nameform: this.nameUser,
                        ageform: this.ageUser,
                        priceform: this.priceUser
                    }
                })
                .then((response) => {
                    console.log(response.data.body);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
});