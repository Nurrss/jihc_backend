const router = require("express").Router();
const _ = require("lodash");

const News = require("../models/News");
const errorHandler = require("../middleware/errorHandler");

// get all done
router.route("/news").get(async (req, res) => {
  try {
    const newsItems = await News.find();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json(newsItems);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// add news
router.post("/news/add", async (req, res) => {
  try {
    console.log(req);
    const { imgPath, newsTitle, description } = req.body;
    const newNews = new News({
      imgPath,
      newsTitle,
      description,
    });
    await newNews.save();
    res.status(200).json(newNews);
  } catch (error) {
    console.log(error);
  }
});

// get by id
router.get("/news/:id", async (req, res) => {
  try {
    const NewsId = _.get(req, "params.id");
    if (!NewsId) {
      res.status(400).json({ message: "Id not found", success: false });
    } else {
      const news = await News.findById(NewsId);
      res.status(200).json(news);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/news/:id", async (req, res) => {
  try {
    const newsId = _.get(req, "params.id");
    const { imgPath, newsTitle, description } = req.body;
    const updatedNews = await News.findByIdAndUpdate(newsId, {
      imgPath,
      newsTitle,
      description,
    });
    const updated = await updatedNews.save();
    console.log(updated);
    res.status(200).json(updatedNews);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/news/:id", async (req, res) => {
  try {
    const newsId = _.get(req, "params.id");
    if (!newsId) {
      return res.status(400).json({ message: ` ID required.` });
    } else {
      await News.findByIdAndDelete(newsId).then(
        res.status(200).json(`${newsId} : was deleted`)
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
