import bcrypt from "bcrypt";

const run = async () => {
  const password = "cinema21";
  const hash = await bcrypt.hash(password, 10);
  console.log("Password asli:", password);
  console.log("Hash bcrypt:", hash);
};

run();
