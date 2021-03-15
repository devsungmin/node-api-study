"use strict";

const models = require("../models");
const responseHandler = require("@utils/responseHandler");
const jwt = require('jsonwebtoken');

module.exports = {
  userLogin(req, res) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    models.User.findone({
      where: {
        username: req.body.username,
        password: crypto
          .createHash("sha256")
          .update(req.body.password + salt)
          .digest("hex"),
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 403, "UserID or Password error");
        } else if (user.dataValues.isVerify === false) {
          responseHandler.fail(res, 403, "Email authentication required");
        } else 
          const hashed_ip = crypto
            .createHash("sha256")
            .update(ip + salt)
            .digest("hex");
          const p = new Promise((resolve, reject) => {
            jwt.sign(
              {
                userid: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                credential: hashed_ip,
              },
              secret_key,
              {
                expiresIn: "30m",
                subject: "userInfo",
              },
              (err, token) => {
                if (err) {
                  reject(err);
                }
                resolve(token);
              }
            );
          });
          p.then((token) => {
            responseHandler.custom(res, 200, {
              result: "success",
              message: "Loginable",
              token: token,
            });
          });
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },
};
