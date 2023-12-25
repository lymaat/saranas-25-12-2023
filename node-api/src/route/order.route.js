
const { userGuard } = require("../controller/auth.controller")
const ct = require("../controller/order.contoller")
const {upload} = require("../util/config")

const order = (app,base_route) => {
    app.get(base_route,userGuard("order.Read"),ct.getAll)
    app.get(`${base_route}/:id`,userGuard(),ct.getOne) // id params // req.params.id
    app.get(`${base_route}_getbycustomer`,userGuard(),ct.getOderByCustomer)
    app.get(`${base_route}_detail`,userGuard("order.Read"),ct.order_detail)

    app.post(base_route,upload.single("image_upload"),userGuard(),ct.create)
    app.post(`${base_route}_report`,userGuard(),ct.sumPricesByDateRange)
    app.post(`${base_route}_topsale`,userGuard(),ct.topSaleByProduct)
    app.put(base_route,userGuard(),ct.update)
    app.delete(`${base_route}/:id`,userGuard(),ct.remove)
}
module.exports = order;