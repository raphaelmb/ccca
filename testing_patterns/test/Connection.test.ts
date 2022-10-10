import Connection from "../src/Connection";

test("Should return data from database", async () => {
  const connection = new Connection();
  const items = await connection.query("select * from item", []);
  expect(items).toHaveLength(3);
});
