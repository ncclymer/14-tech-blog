const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbComment => res.json(dbComment))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('./', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.session.post_id,
            user_id: req.session.user_id
        })
            .then(dbComment => res.json(dbComment))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbComment => {
            if (!dbComment) {
                res.status(404).json({ message: "Couldn't find a post with that id." });
                return;
            }
            res.json(dbComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;