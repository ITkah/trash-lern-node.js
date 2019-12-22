const сalendar = new Vue({
    el: '#app',
    data: {
        name: null,
        age: null,
    },
    methods: {
        sendForm() {
            axios
                .post(`/user`, {
                    body: {
                        nameUser = this.name,
                        ageUser = this.age
                    }
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
});
