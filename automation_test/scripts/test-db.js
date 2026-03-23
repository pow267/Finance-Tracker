const { connectDB } = require("../utils/db");

(async () => {
  const db = await connectDB();
  const data = await db.collection("transactions").find().limit(1).toArray();
  console.log(data);
})();