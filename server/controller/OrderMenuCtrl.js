const checkOrder = async (req, res, next) => {
  try {
    const { orderName } = req.body;
    const result = await req.context.models.order_menu.findByPk(orderName);
    if (!result) return res.sendStatus(404);
    req.order = result.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const updateOrderPayt = async (req, res) => {
  try {
    const { orderName } = req.body;

    if (req.order.order_status === "open") {
      await req.context.models.order_menu.update(
        {
          order_payment_trx: req.payt.payt_trx_number,
          order_status: "deliver",
        },
        { returning: true, where: { order_name: orderName } }
      );
      return res.send(req.payt);
    }

    if (
      req.order.order_status === "deliver" &&
      req.payt.payt_type === "refund"
    ) {
      await req.context.models.order_menu.update(
        {
          order_status: "cancel",
        },
        { returning: true, where: { order_name: orderName } }
      );
      return res.send(req.payt);
    }

    if (
      req.order.order_status === "deliver" &&
      req.payt.payt_type === "transfer"
    ) {
      await req.context.models.order_menu.update(
        {
          order_status: "closed",
        },
        { returning: true, where: { order_name: orderName } }
      );
      return res.send(req.payt);
    }
  } catch (error) {
    return res.send(error);
  }
};

const accRestoFromOrder = async (req, res, next) => {
  try {
    const { orderName } = req.body;
    const result = await req.context.models.order_menu.findOne({
      where: { order_name: orderName },
      include: [
        {
          model: req.context.models.cart_line_items,
          include: [
            {
              model: req.context.models.carts,
              include: [
                {
                  model: req.context.models.resto_shop,
                  include: [
                    {
                      model: req.context.models.users,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const userResto =
      result.cart_line_items[0].cart.resto_shop.dataValues.reto_user_id;
    const accResto = await req.context.models.account_payment.findOne({
      where: { acc_user_id: userResto },
    });

    req.accResto = accResto.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

export default {
  checkOrder,
  updateOrderPayt,
  accRestoFromOrder,
};
