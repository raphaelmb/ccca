import { mount } from "@vue/test-utils";
//@ts-ignore
import AppVue from "../src/App.vue";

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

test("should have an empty order", async () => {
  const wrapper = mount(AppVue, {});
  expect(wrapper.get(".title").text()).toBe("Checkout");
  expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".product-price").at(0)?.text()).toBe("$1,000.00");
  expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".product-price").at(1)?.text()).toBe("$5,000.00");
  expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
  expect(wrapper.findAll(".product-price").at(2)?.text()).toBe("$30.00");
  expect(wrapper.get(".total").text()).toBe("$0.00");
});

test("should have an order with one item", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$1,000.00");
  expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
});

test("should have an order with many items and quantity greater than one", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$6,090.00");
  expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
  expect(wrapper.findAll(".item-description").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".item-quantity").at(1)?.text()).toBe("1");
  expect(wrapper.findAll(".item-description").at(2)?.text()).toBe("C");
  expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("3");
});

test("should have an order with many items and decrease the quantity of items in the order", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(2)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(2)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$6,030.00");
  expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("1");
});

test("should have an order with many items and increase the quantity of items in the order", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$1,000.00");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
  await wrapper.findAll(".item-increase-button").at(0)?.trigger("click");
  await wrapper.findAll(".item-increase-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$3,000.00");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("3");
});

test("should have an order with many items and decrease the quantity of items in the order and do not allow quantity less than 0", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(0)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(0)?.trigger("click");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBeUndefined();
  expect(wrapper.get(".total").text()).toBe("$0.00");
});

test("should confirm an order with one item", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.get(".confirm").trigger("click");
  await sleep(100);
  expect(wrapper.get(".message").text()).toBe("Success");
  expect(wrapper.get(".order-code").text()).toBe("202300000001");
  expect(wrapper.get(".order-total").text()).toBe("1030");
});

test("should have 4 products", async () => {
  const wrapper = mount(AppVue, {});
  await sleep(100);
  expect(wrapper.get(".title").text()).toBe("Checkout");
  expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".product-price").at(0)?.text()).toBe("$1,000.00");
  expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".product-price").at(1)?.text()).toBe("$5,000.00");
  expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
  expect(wrapper.findAll(".product-price").at(2)?.text()).toBe("$30.00");
  expect(wrapper.findAll(".product-description").at(3)?.text()).toBe("D");
  expect(wrapper.findAll(".product-price").at(3)?.text()).toBe("$1,000.00");
});
