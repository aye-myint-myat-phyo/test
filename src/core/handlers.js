import { productUi } from "../app/product";
import { calculateRecordTotal, recordUi, recordUpdate } from "../app/record";
import {
  app,
  newProductForm,
  productDrawer,
  quantityInput,
  recordForm,
  recordGroup,
} from "./selectors";
import { products } from "./variables";

export const manageProductBtnHandler = () => {
  productDrawer.classList.toggle("translate-x-full");
  productDrawer.classList.add("duration-200");
};

export const newProductFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(newProductForm);

  // console.log(formData.get("new-product-name"));
  // console.log(formData.get("new-product-price"));

  const newProduct = {
    id: Date.now(),
    name: formData.get("new-product-name"),
    price: formData.get("new-product-price"),
  };

  productGroup.append(productUi(newProduct));
  productSelect.append(new Option(newProduct.name, newProduct.id));
  products.push(newProduct);

  newProductForm.reset();
};

export const recordFormHandler = (event) => {
  event.preventDefault();
  const currentProduct = products.find(
    (product) => product.id == productSelect.value
  );

  const isExist = app.querySelector(`[product-id='${currentProduct.id}']`);
  if (isExist) {
    recordUpdate(currentProduct.id, quantityInput.valueAsNumber);
  } else {
    recordGroup.append(
      recordUi(
        currentProduct.id,
        currentProduct.name,
        currentProduct.price,
        quantityInput.valueAsNumber
      )
    );
  }
  recordForm.reset();
  calculateRecordTotal();
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-del")) {
    if (confirm("Are you sure to delete?")) {
      event.target.closest("tr").remove();
    }
  } else if (event.target.classList.contains("q-add")) {
    recordUpdate(event.target.closest("tr").getAttribute("product-id"), 1);
  } else if (event.target.classList.contains("q-sub")) {
    recordUpdate(event.target.closest("tr").getAttribute("product-id"), -1);
  }
};

export const printBtnHandler = () => {
  print();
};
