var middleware = require("../../jwt/middleware");
const { encryptPassword } = require('../../crypto');

/**
 * 
 * @param {Express} app 
 * @param {Database} db 
 */
const userModule = (app, db) => {
    app.get("/api/user", (req, res, next) => {
        var sql = "select * from user"
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


    app.get("/api/user/:id", (req, res, next) => {
        var sql = "select * from user where id = ?"
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

    app.post("/api/user", middleware.ensureToken, async (req, res, next) => {
        const password = await encryptPassword(req.body.password);
        var errors = []
        if (!req.body.password) {
            errors.push("No password specified");
        }
        if (!req.body.email) {
            errors.push("No email specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            email: req.body.email,
            password: password,
        }
        var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
        var params = [data.name, data.email, data.password]
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



    app.patch("/api/user/:id", middleware.ensureToken, async (req, res, next) => {
        const password = await encryptPassword(req.body.password);
        var data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password ? password : undefined
        }
        db.run(
            `UPDATE user set 
               name = coalesce(?,name), 
               email = COALESCE(?,email), 
               password = coalesce(?,password) 
               WHERE id = ?`, [data.name, data.email, data.password, req.params.id],
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


    app.delete("/api/user/:id", middleware.ensureToken, (req, res, next) => {
        db.run(
            'DELETE FROM user WHERE id = ?',
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


module.exports = userModule;