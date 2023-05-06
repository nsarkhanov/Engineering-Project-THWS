module.exports = mongoose => {
    var SchemaUser = mongoose.Schema(

      { username:String,
        userid:String,
        name:String,
        password:String,
        email:String,
        gender:String,
        status:Boolean,
        role: String,
      },
      { timestamps: true }
    );
  
    SchemaUser.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User_data= mongoose.model("user", SchemaUser);
    return User_data;
  };