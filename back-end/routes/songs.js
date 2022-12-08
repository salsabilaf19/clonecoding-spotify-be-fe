const router = require('express').Router();
const { User } = require('../models/user');
const { User, validate } = require('../models/song');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validObject = require('../middleware/validObjectId');

// create song
router.post('/', admin, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    const song = await Song(req.body).save();
    res.status(200).send({ data: song, message:'Song created successfully' });
});

// get all songs
router.get('/', async(req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
});

// update song 
router.put('/:id', [validObject, admin], async(req,res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.status(200).send({ data:song, message:'Updated song successfully' })
});

// delete song
router.delete('/:od', [validObject, admin], async(req, res) => {
    await Song.findByIdAndDelete(req.params);
    res.status(200).send({ message: 'Deleted songs successfully'});
});

// like song
router.put('/like/:id', [validObject, auth], async(req, res) => {
    const song = await Song.findById(req.params.id);
    if(!song) return res.status(400).send({ message: 'Cannot find song'});

    const user = await User.findById(req.user._id);
    const index = user.likedSongs.indexOf(song._id);
    if(index === -1){
        user.likedSongs.push(song._id);
    }else{
        user.likedSongs.splice(index,1);
    }
})