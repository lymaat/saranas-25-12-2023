

const db = require("../util/db")
const { isEmptyOrNull, invoiceNumber } = require("../util/service")
const getParam = (value) => {
    if (value == "" || value == "null" || value == "undefined") {
        return null
    }
    return value
}

const remove = (req, res) => {
    var sql = "DELETE FROM order_detail WHERE order_detail_id = ?"
    // var sql = "UPDATE customer SET is_active = 0 WHERE customer_id = ? "
    db.query(sql, [req.params.id], (error, row) => {
        if (!error) {
            // customer_address 
            var sql = ""
            res.json({
                message: (row.affectedRows) ? "Delete successfully!" : "Data not in system",
                data: row
            })
        } else {
            res.json({
                error: true,
                message: error
            })
        }
    })
}
const getAll = async (req, res) => {
    try {
        const { page, txtSearch } = req.query


        var limitItem = 100
        var offset = (page - 1) * limitItem
        var select = " SELECT od.*, p.name, p.product_id, p.price, p.description o.invoice_no FROM order_detail"
        var join = " INNER JOIN product p ON (od.product_id = p.product_id)" +
            " INNER JOIN `order` o ON (o.order_id = od.order_id)"

        if (!isEmptyOrNull(txtSearch)) {
            where = " AND o.tel = ? OR o.invoice_no LIKE ? OR o.firstname LIKE ? OR o.lastname LIKE ? "; // Use parentheses to group conditions
            param.push(txtSearch)
            param.push("%" + txtSearch + "%")
            param.push("%" + txtSearch + "%")
            param.push("%" + txtSearch + "%")
        }
        var order = " ORDER BY o.invoice_no DESC "
        var sql = select + join + where + order + limit;
        var limit = " LIMIT "+limitItem+" OFFSET "+offset+""

        const list = await db.query(sql,param)
 
        var sqlProduct = "SELECT * FROM product"
        const Product = await db.query(sqlProduct)
        var sqlOrder = " SELECT * FROM `order` "
        const Order = await db.query(sqlOrder)
        res.json({
            list:list,
            listProduct : Product,
            listOrder: Order,
            bodyData: req.body,
            queryData: req.query,
        })
    } catch (e){
                console.log(e)
                res.status(500).send({
                    message: 'Internal Error!',
                    error: e
                });
            }
}
module.exports = {
    remove,
    getAll
}