const model = require("../models/index");
const response = require("../helper/response");
const { Op } = require("sequelize");
const pagination = require("../helper/pagination");

const getProductById = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const result = await model.products.findOne({
      where: {
        id: productId,
      },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "get product by id succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return response(res, { status: 500, message: "image harus ada" });
    }
    const body = req.body;
    const newBody = {
      ...body,
      image: image.path,
    };

    const result = await model.products.create(newBody);
    return response(res, {
      data: result,
      status: 200,
      message: "create product success",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      massage: "Terjadi Error",
      error,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    let body = req.body;
    const getProduct = await model.products.findOne({
      where: {
        id: productId,
      },
    });
    const image = req.file;
    const product = getProduct.dataValues;
    let newBody = {
      ...body,
      image: product.image,
    };
    if (image) {
      newBody = { ...newBody, image: image.path };
    }
    const result = await model.products.update(newBody, {
      where: { id: productId },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "update product success",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      massage: "Terjadi Error",
      error,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const result = await model.products.destroy({
      where: {
        id: productId,
      },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "delete product by id succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const getAllProduct = async (req, res) => {
  const { per_page, page, search } = req.query;
  const where = {};
  const whereOr = [];
  const limit = parseInt(per_page ?? 10);
  const offset = parseInt((page ?? 1) * limit) - limit;

  if (search) {
      whereOr.push(
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        }
      )
    }
    if (whereOr.length !== 0) where[Op.or] = whereOr;
    console.log(search);
    try {
    const result = await model.products.findAll({
      where,
      limit: limit,
      offset: offset,
      // order: [[sortBy ?? "createdAt", sort ?? "DESC"]],
    });
      const totalPage= await model.products.findAndCountAll()
      return pagination(res, req, {
        data: result,
        total: totalPage.count,
        status: 200,
        message: "get product succes",
        limit,
        offset,
        query: req.query,
      });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  getAllProduct
};
