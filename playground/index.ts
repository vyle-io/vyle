import Vyle from "../src";

(async function () {
  console.log(await Vyle.addProject("test@vyle.io"));

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmM3YWIyYzgzMGMwNjgwMjZlOGNjNiIsImFkbWluIjp0cnVlLCJpYXQiOjE2OTAwNzM3Nzh9.NpI-ZPB-4Jd4GpyFj8Yh4QQeM-6ryw6VtxA0HdkNNUE";
  const v = new Vyle(token);
  await v.init();

  console.log(await v.file.list({}));
})();
