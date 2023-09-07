const { validationResult } = require("express-validator");
const { success, failure } = require("../util/common");
const ProductModel = require("../model/Product");
const HTTP_STATUS = require("../constants/statusCodes");

class ProductController {
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter (default to 1)
      const limit = parseInt(req.query.limit) || 10; // Get the number of items per page from the query parameter (default to 10)

      // Calculate the skip value to paginate the results
      const skip = (page - 1) * limit;

      const query = {}; // You can add additional query conditions here if needed

      const allProducts = await ProductModel.find(query, { title: 1, price: 1 })
        .skip(skip)
        .limit(limit);
        if (allProducts.length === 0) {
          return res
            .status(HTTP_STATUS.NOT_FOUND)
            .send(success("No products were found"));
        }
        return res.status(HTTP_STATUS.OK).send(success("Successfully received all products", allProducts));
      } catch (error) {
        console.log(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
      }
  }

  async create(req, res){
    try {
        const validationErrors = validationResult(req).array();
        if (validationErrors.length > 0) {
          return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Validation failed", validationErrors));
        }
    
        const { title, description, price } = req.body;
        const Product = await ProductModel.create({ title, description, price });
    
        if (Product) {
            return res.status(HTTP_STATUS.CREATED).send(success("Product created successfully", Product));
          } else {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Failed to create"));
          }
      } catch (error) {
        console.log(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
      }

  }
}

module.exports = new ProductController();