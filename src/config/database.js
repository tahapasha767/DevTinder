const mongoose=require('mongoose');

const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://tahapasha121:lGA3VHyaA8z2fkuE@cluster0.n5e1vsq.mongodb.net/HelloWorld?retryWrites=true&w=majority");

};

module.exports={connectDb}

