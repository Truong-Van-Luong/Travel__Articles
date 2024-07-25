class StoryController {
    index(req, res) { 
        res.render('story');
    }

    show(req, res) {
        res.render('story-detail');
    }
}

export default new StoryController;