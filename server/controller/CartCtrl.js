const createCart = async (req, retoId, userId) => {
  return await req.context.models.carts.create({
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
  const isAlreadyExist = await req.context.models.cart_line_items.findOne({
    where: { clit_reme_id: reme_id },
  });

  if (isAlreadyExist) {
    const { clit_id, clit_qty } =
      await req.context.models.cart_line_items.findOne({
        where: { clit_reme_id: reme_id },
      });
    const newQty = clit_qty + qty;
    const updateLineItems = await req.context.models.cart_line_items.update(
      {
        clit_qty: newQty,
        clit_price: reme_price,
        clit_subtotal: newQty * reme_price,
      },
      { returning: true, where: { clit_id: clit_id } }
    );
    return updateLineItems;
  }

  const newLineItems = await req.context.models.cart_line_items.create({
    clit_reme_id: reme_id,
    clit_redon_id: redon_id,
    clit_qty: qty,
    clit_price: reme_price,
    clit_subtotal: qty * reme_price,
    clit_cart_id: cart_id,
  });

  return newLineItems;
};

const addToCart = async (req, res, next) => {
  const { reme_id, redon_id, qty } = req.body;
  const { userId } = req.user;

  try {
    const { reme_reto_id, reme_price } =
      await req.context.models.resto_menu.findOne({
        where: { reme_id: reme_id },
      });
    const isCartOpen = await req.context.models.carts.findOne({
      where: {
        cart_status: "open",
        cart_reto_id: reme_reto_id,
        cart_user_id: userId,
      },
    });

    if (!isCartOpen) {
      const cart = await createCart(req, reme_reto_id, userId);
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
    } else {
      const { cart_id } = await req.context.models.carts.findOne({
        where: {
          cart_status: "open",
          cart_reto_id: reme_reto_id,
          cart_user_id: userId,
        },
      });

      const addToNewLineItems = await saveLineItems(
        req,
        reme_id,
        redon_id,
        qty,
        reme_price,
        cart_id
      );
      return res.send(addToNewLineItems);
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

export default {
  addToCart,
};
