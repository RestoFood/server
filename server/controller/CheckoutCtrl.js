const updateItems = async (req, res, next) => {
  const { cartId, itemsChecked } = req.body;
  await req.context.models.cart_line_items.update(
    {
      clit_status: "checkout",
    },
    {
      returning: true,
      where: { clit_id: itemsChecked.map((item) => item.clit_id) },
    }
  );
  await req.context.models.cart_line_items.update(
    {
      clit_status: "canceled",
    },
    {
      returning: true,
      where: { clit_cart_id: cartId, clit_status: "open" },
    }
  );

  const allItems = await req.context.models.cart_line_items.findAndCountAll({
    where: { clit_cart_id: cartId },
  });
  req.cart = cartId;
  req.items = allItems;
  return next();
};

const updateStatus = async (req, res, next) => {
  try {
    const checkCart = await req.context.models.carts.update(
      {
        cart_status: "close",
      },
      { returning: true, where: { cart_id: req.cart } }
    );
    return res.send({
      status: "terupdate",
      cart: checkCart,
      items: req.items,
    });
  } catch (error) {
    return res.send(error);
  }
};

export default {
  updateItems,
  updateStatus,
};
