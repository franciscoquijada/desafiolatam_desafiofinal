var middleware = require("../../jwt/middleware");

    /**
 * 
 * @param {Express} app 
 * @param {Database} db 
 */
const productModule = (app, db) => {
    app.get("/api/product", middleware.ensureToken, async (req, res, next) => {
        var sql = "select * from products"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            setTimeout(() => {
                res.json({
                    "message": "success",
                    "data": rows
                })
            }, 2000);
        });
    });


    app.get("/api/product/:id", (req, res, next) => {
        var sql = "select * from products where id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            setTimeout(() => {
                res.json({
                    "message": "success",
                    "data": row
                })
            }, 1000);
        });
    });
    

    app.post("/api/product", middleware.ensureToken, async (req, res, next) => {
        var errors = []
        if (!req.body.name) {
            errors.push("No name specified");
        }
        if (!req.body.quantity) {
            errors.push("No quantity specified");
        }
        if (!req.body.price) {
            errors.push("No price specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        }
        var sql = 'INSERT INTO products (name, price, quantity) VALUES (?,?,?)'
        var params = [data.name, data.price, data.quantity]
        db.run(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        });
    })



    app.put("/api/product/:id", middleware.ensureToken, async (req, res, next) => {
        
        var data = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
        }
        db.run(
            `UPDATE products set 
               name = coalesce(?,name), 
               price = COALESCE(?,price), 
               quantity = coalesce(?,quantity) 
               WHERE id = ?`, [data.name, data.price, data.quantity, req.params.id],
            (err, result) => {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    message: "success",
                    data: data
                })
            });
    })


    app.delete("/api/product/:id", middleware.ensureToken, (req, res, next) => {
        db.run(
            'DELETE FROM products WHERE id = ?',
            req.params.id,
            function(err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes })
            });
    })


    // Root path
    app.get("/", (req, res, next) => {
        res.json({ "message": "Ok" })
    });
}


module.exports = productModule;