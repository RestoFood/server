const createCart = async (req, retoId, userId) => {
  return await req.context.models.carts.create({
    cart_createdon: new Date(),
    cart_status: "open",
    cart_reto_id: retoId,
    cart_user_id: userId,
  });
};

const saveLineItems = async (
  req,
  reme_id,
  redon_id,
  qty,
  reme_price,
  cart_id
) => {
  return await req.context.models.cart_line_items.create({
    clit_reme_id: reme_id,
    clit_redon_id: redon_id,
    clit_qty: qty,
    clit_price: reme_price,
    clit_subtotal: qty * reme_price,
    clit_order_name: "",
    clit_cart_id: cart_id,
  });
};

const addToCart = async (req, res, next) => {
  const { reme_id, redon_id, qty, user_id } = req.body;

  try {
    const isCartExist = await req.context.models.carts.findOne({
      where: { cart_user_id: user_id },
    });
    if (!isCartExist) {
      const { reme_reto_id, reme_price } =
        await req.context.models.resto_menu.findOne({
          where: { reme_id: reme_id },
        });
      const cart = await createCart(req, reme_reto_id, user_id);
      const { cart_id } = cart.dataValues;

      const lineItems = await saveLineItems(
        req,
        reme_id,
        redon_id,
        qty,
        reme_price,
        cart_id
      );
      return res.send(lineItems);
    }

    return res.send("sudah ada");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

export default {
  addToCart,
};
