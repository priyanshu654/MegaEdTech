const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
        
    },
    bio:{
        type:String
    },
    dob:{
        type:Date,
        
    },
    contactNumber:{
        type:String,
        
    }
});

const Profile=mongoose.model("Profile",profileSchema);

module.exports=Profile;