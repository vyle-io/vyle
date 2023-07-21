import Vyle from "../src";

(async function () {
  // console.log(await Vyle.addProject());

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjhhNmY2MmVkNzQzYWJjZWVmMTNmYSIsImlhdCI6MTY4OTgyMjk2Nn0.4Pbw3s-m_kKjyNwZw5H6NA34XFbyAcblSQSGowZh64c";
  const v = new Vyle(token);
  await v.init();

  console.log(await v.file.list({}));
})();
