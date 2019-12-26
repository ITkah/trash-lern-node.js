const сalendar = new Vue({
    el: '#app',
    data: {
        name: '',
        age: '',
    },
    created() {

    },
    methods: {
        sendForm() {
            axios
                .post(`/userSend`, {
                    body: {
                        // nameform: this.name,
                        // ageform: this.age,
                        id: 2
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