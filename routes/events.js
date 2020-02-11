const router = require("express").Router();
class EventsRoutes {
  constructor(controller) {
    this.controller = controller;
    this.init();
  }

  init() {
      router.post("/addEvent", async (req, res) => {
        try {
          console.log(req.body,this.controller)
        const response = await this.controller.add(req.body);
          res.json(response);
        } catch (err) {
          global.log.error(err);
          res.json({ code: 500, msg: "An error occurred !" });
        }
  
        res.end();
      });
      router.get("/getEvents", async (req, res) => {
        try {
        const response = await this.controller.getAll();
          res.json(response);
        } catch (err) {
          global.log.error(err);
          res.json({ code: 500, msg: "An error occurred !" });
        }
  
        res.end();
      });
      router.post("/vote", async (req, res) => {
        try {
          console.log(req.body,this.controller)
        const response = await this.controller.vote(req.body);
          res.json(response);
        } catch (err) {
          global.log.error(err);
          res.json({ code: 500, msg: "An error occurred !" });
        }
  
        res.end();
      });
      router.post("/getVoteCount", async (req, res) => {
        try {
          console.log(req.body,this.controller)
        const response = await this.controller.getVoteCount(req.body);
          res.json(response);
        } catch (err) {
          global.log.error(err);
          res.json({ code: 500, msg: "An error occurred !" });
        }
  
        res.end();
      });
      router.post("/addComment", async (req, res) => {
        try {
          console.log(req.body,this.controller)
        const response = await this.controller.comment(req.body);
          res.json(response);
        } catch (err) {
          global.log.error(err);
          res.json({ code: 500, msg: "An error occurred !" });
        }
  
        res.end();
      });
      router.post("/getComments", async (req, res) => {
        try {
          console.log(req.body,this.controller)
        const response = await this.controller.getEventComments(req.body);
          res.json(response);
        } catch (err) {
          global.log.error(err);
          res.json({ code: 500, msg: "An error occurred !" });
        }
  
        res.end();
      });
    }
    
    getRouter() {
      return router;
    }
}
module.exports = controller => {
  return new EventsRoutes(controller);
};
