const requireLogin = require('../middlewares/requireLogin');


module.exports = app => {
    app.post('/api/surveys', requireLogin, (req, res) => {
        const { title, subject, body, recipients } = req.body;
        console.log(req.body);
        res.send(req.body);
    });
};
