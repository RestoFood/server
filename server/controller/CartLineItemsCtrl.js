const findAllCartLineItems = async (req, res) => {
  try {
    const result = await req.context.models.cart_line_items.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findCartLineItemsByCartId = async (req, res) => {
  const cartId = req.params.id;
  try {
    const result = await req.context.models.cart_line_items.findAndCountAll({
      where: { clit_cart_id: cartId },
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export default {
  findAllCartLineItems,
  findCartLineItemsByCartId,
};
