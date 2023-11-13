const Bookmark = require("../models/Bookmark");
const Road = require("../models/Road");


module.exports = {
    // createBookmark: async (req, res) => {
    //     const newBook = new Bookmark(req.body);

    //     try {
    //         const savedBookmark = await newBook.save();
    //         const { __v, updatedAt, ...newBookmarkInfo } = savedBookmark._doc;
    //         res.status(200).json(newBookmarkInfo)
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    // },

    createBookmark: async (req, res) => {
        const roadID = req.body.road;

        try {
            const road = await Road.findById(roadID); // Retrieve the road data by ID

            if (!road) {
                return res.status(404).json({ error: 'Road not found' });
            }


            const newBook = new Bookmark({ road: road, userId: req.user.id }); // Create a new bookmark with the populated road data

            const savedBookmark = await newBook.save();

            const { __v, updatedAt, ...newBookmarkInfo } = savedBookmark._doc;

            res.status(200).json(newBookmarkInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // deleteBookmark: async (req, res) => {
    //     // const user = req.user.id;
    //     // console.log(user)
    //     // console.log(req.params.id)
    //     try {
    //         await Bookmark.findByIdAndDelete(req.params.id)
    //         res.status(200).json("BookMark Successfully Deleted")
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    // },

    deleteBookmark: async (req, res) => {
        try {
            const userId = req.user.id;
            const roadId = req.params.id;
            
            await Bookmark.findOneAndDelete({ userId, roadId });
            
            res.status(200).json("Bookmark successfully deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },


    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ userId: req.user.id })
                .populate("road", "-requirements",);
            res.status(200).json(bookmarks)
        } catch (error) {
            res.status(500).json(error)
        }
    }


}