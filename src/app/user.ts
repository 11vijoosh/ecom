export class User {
    constructor(
        public name: String,
        public email:String,
        public password: String,
        public phone: Number,
        public address:{
            street:String,
            city: String,
            state: String,
            pincode: Number,
            country: String
        },

    ) {}
}
