import { aeroCoinContract } from "./utils/aeroCoin";

async function getName() {
  const name = await aeroCoinContract.name();
  console.log("Token Name:", name);
}
