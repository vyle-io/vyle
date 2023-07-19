import Vyle from "../src";

(async function () {
  // console.log(await Vyle.addProject());

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjg1MjAyNWQ4Zjg0MzI0NDg4NWQ0OCIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODk4MDEyMTh9.wMI9qPFs8RIskNM3AQ_qfk9SKChMY3SSiNBINfplGyY";
  const v = new Vyle(token);
  await v.init();

  console.log(await v.file.list());
})();
