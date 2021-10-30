const updateItems = async (req, res) => {
  const { cartId, itemsChecked } = req.body;
  try {
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
  } catch (error) {
    return res.send(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { cartId } = req.cart;
  const { allItems } = req.items;

  try {
    const checkCart = await req.context.models.carts.update(
      {
        cart_status: "close",
      },
      { returning: true, where: { cart_id: cartId } }
    );
    return res.send({
      cart: checkCart,
      items: allItems,
    });
  } catch (error) {
    return res.send(error);
  }
};

export default {
  updateItems,
  updateStatus,
};
