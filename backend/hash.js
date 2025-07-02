import bcrypt from "bcrypt";

const run = async () => {
  const password = "admin123";
  const hash = await bcrypt.hash(password, 10);
  console.log("Password asli:", password);
  console.log("Hash bcrypt:", hash);
};

run();
