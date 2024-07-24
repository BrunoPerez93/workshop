const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
  }, {
    timestamps: true,
  });
  
  const Brand = mongoose.models.Brand || mongoose.model("Brand", userSchema);
  
  export default Brand;
  