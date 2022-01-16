const express = require("express");
const joi = require("joi");
const fs = require("fs");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/search", async (req, res) => {
  console.log(req.query.query);
  return res.json(await req.context.schemas.User.fuzzySearch(req.query.query));
});
router.get("/user-add/:id", async (req, res) => {


  const user = await req.context.schemas.User.findOne({
    username: req.params.id,
  });

  


  if (!user) {
    return res.json({
      error: "user not found",
    });
  } else {
    return res.json(user);
  }
});

router.get("/user/:id", async (req, res) => {
  const user = await req.context.schemas.User.findOne({
    username: req.params.id,
  });

  if (!user) {
    return res.json({
      error: "user not found",
    });
  } else {
    return res.json(user);
  }
});
router.get("/links/delete/:id", async (req, res) => {
  const q = req.query.uid;
  const user = req.params.id;
  const doc = await req.context.schemas.User.findOne({
    username: user,
  });

  var idx = doc.links ? doc.links.indexOf(q) : -1;

  if (idx !== -1) {
    doc.links.splice(idx, 1);
    await doc.save();
    return res.json({
      success: "Done!",
    });
  } else {
    return res.json({
      error: "Error",
    });
  }
});
router.post("/user/create", async (req, res) => {
  const body = req.body;
  console.log(body);
  const validator = joi.object({
    username: joi.string().required(),
    address: joi.string().required(),
    links: joi
      .array()
      .items({ title: joi.string().required(), url: joi.string().required() })
      .required(),
    pfp: joi.string(),
  });
  const doc = await req.context.schemas.User.findOne({
    address: body.address,
  });
  const val = validator.validate(body);

  if (val.error) {
    console.log(val.error);
    return res.json({
      error: val.error,
    });
  }

  if (!doc) {
    const doc = new req.context.schemas.User({
      username: val.value.username,
      address: val.value.address,
      links: val.value.links,
      pfp: val.value.pfp,
    });
    await doc.save();

    return res.json({
      message: "Sucessfully done!",
    });
  } else {
    const filter = { address: val.value.address };
    const update = {
      username: val.value.username,
      links: val.value.links,
      pfp: val.value.pfp,
    };
    const doc = await req.context.schemas.User.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    return res.send(doc);
  }
});
module.exports = router;
