import Vyle from "../src";

(async function () {
  // console.log(await Vyle.addProject("test@vyle.io"));

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmM3Y2VhYzgzMGMwNjgwMjZlOGNjOSIsImFkbWluIjp0cnVlLCJpYXQiOjE2OTAwNzQzNDZ9.w9uRnJJaVe1Y7Y4BaJj0EAuPbiRfc_z2RB_TZ4kksPE";
  const v = new Vyle(token);
  await v.init();

  console.log(await v.file.list({}));
})();
