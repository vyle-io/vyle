import Vyle from "../src";

(async function () {
  // console.log(await Vyle.addProject());

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhhNmY2MmVkNzQzYWJjZWVmMTNmYSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODk4MjI5NjZ9.t0ABVFre_LJ68I2e8NIy1HELtaGj1X8EAdgvdBzLhvw";
  const v = new Vyle(token);
  await v.init();

  console.log(await v.file.list({}));
})();
