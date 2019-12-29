const сalendar = new Vue({
    el: '#app',
    data: {
        name: '',
        age: '',
    },
    output: null,
    created() {
        axios.get('/get')
            .then(response => (this.output = response))
            .catch(error => (console.log(error)));
    },
    methods: {
        sendForm() {
            axios
                .post(`/userSend`, {
                    body: {
                        nameform: this.name,
                        ageform: this.age,
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