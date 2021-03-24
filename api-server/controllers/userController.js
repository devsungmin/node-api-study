"use strict";

const models = require("../models");
const responseHandler = require("../utils/responeseHandler");
const jwt = require("jsonwebtoken");

module.exports = {
  // 회원 가입
  async singup(req, res) {
    let transaction = null;
    try {
      transaction = await models.sequelize.transaction();
      let check = [];

      check.push(
        await models.User.findone({
          where: {
            username: req.body.username,
          },
        })
      );
      check.push(
        await models.User.findone({
          where: {
            email: req.body.email,
          },
        })
      );

      if (check[0]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "이미 사용중인 ID입니다.");
      } else if (check[1]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "이미 회원가입된 이메일입니다.");
      } else {
        const hash_id = crypto
          .createHash("sha256")
          .update(req.body.username + salt)
          .digest("hex");

        const hash_pw = crypto
          .createHash("sha256")
          .update(req.body.password + salt)
          .digest("hex");

        await models.User.create(
          {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
          },
          {
            transaction,
          }
        );
      }
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "서버 에러");
    }
  },

  // 로그인
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
    }).then((user) => {
      if (!user) {
        responseHandler.fail(res, 403, "UserID or Password error");
      } else if (user.dataValues.isVerify === false) {
        responseHandler.fail(res, 403, "Email authentication required");
      } else {
        const hashed_ip = crypto.createHash("sha256").update(ip + salt).digest("hex");
        const p = new Promise(
          (resolve, reject) => {
            jwt.sign(
              {
                userid: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                credential: hashed_ip
              },
              secret_key,
              {
                expiresIn: '30m',
                subject: 'userInfo'
              }, (err, token) => {
                if (err) {
                  reject(err)
                }
                resolve(token)
              })
          })
        p.then((token) => {
          responseHandler.custom(res, 200, {
            result: "success",
            message: "Loginable",
            token: token
          })
        })
      }
    })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },
};
