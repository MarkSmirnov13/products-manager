# Products manager

Simple products manager.

### Features:
- see products list
- add new product
- update existing product
- delete existing product

---

### Form validation:
- Name is required, length not greater than 200
- Rating is required, integer, not greater than 10
- A product should have from 1 to 5 categories
- If a product has an expiration date it should expire not less than 30 days since now
- If a product rating is greater than 8 it should automatically become “featured” product

---

### API Simulator:
- `categoryApi.getCategories` - get all categories
- `productApi.getProducts` - get all products
- `productApi.addProduct` - add new product
- `productApi.updateProduct` - update existing product
- `productApi.deleteProduct` - delete existing product

---

You can run cloned project using following commands:
### `npm i && npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
