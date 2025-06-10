const mongoose = require("mongoose");
const Review = require("./review");

// let MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

// main().then( () => {
//     console.log('server is connected');
// }).catch( (err) => {
//     console.log(err);
// })


// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
            default: "no name"
        },
        url: {
            type: String,
            default: "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?t=st=1742793692~exp=1742797292~hmac=99832ee862fd7b11080f7cd873416dcdf5eb3b29e103d54ed709a346cf1cbb9b&w=1380",
            set: (v) => v === ""?
            "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?t=st=1742793692~exp=1742797292~hmac=99832ee862fd7b11080f7cd873416dcdf5eb3b29e103d54ed709a346cf1cbb9b&w=1380"
            : v
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
        },
        coordinates: {
        type: [Number],
        required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;