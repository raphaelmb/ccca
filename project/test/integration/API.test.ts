import axios from "axios";

test("Should call /items", async () => {
  const { data: items } = await axios({
    url: "http://localhost:3000/items",
    method: "get",
  });
  expect(items).toHaveLength(3);
});
