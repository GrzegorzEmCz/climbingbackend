const Road = require("../models/Road");

module.exports = {
    createRoad: async (req, res) => {
        const newRoad = new Road(req.body);

        try {
            const savedRoad = await newRoad.save();
            const { __v, updatedAt, ...newRoadInfo } = savedRoad._doc;
            res.status(200).json(newRoadInfo)
        } catch (error) {
            res.status(500).json(error)
        }
    },


    updateRoad: async (req, res) => {
        try {
            const updatedRoad = await Road.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            }, { new: true });

            const { password, __v, createdAt, ...road } = updatedRoad._doc;

            res.status(200).json({ ...road });
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteRoad: async (req, res) => {
        try {
            await Road.findByIdAndDelete(req.params.id)
            res.status(200).json("Road Successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getRoad: async (req, res) => {
        try {
            const road = await Road.findById(req.params.id);
            const { __v, createdAt, ...roadData } = road._doc;
            res.status(200).json(roadData)
        } catch (error) {
            res.status(500).json(error)
        }
    },


    getAllRoads: async (req, res) => {
        const recent = req.query.new;
        try {
            let roads;
            if (recent) {
                roads = await Road.find().sort({ createdAt: -1 }).limit(2)
            } else {
                roads = await Road.find()
            }
            res.status(200).json(roads)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    searchRoads: async (req, res) => {
        try {
            const results = await Road.aggregate(
                [
                    {
                        $search: {
                            index: "roadsearch",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            )
            res.status(200).send(results);
        } catch (err) {
            res.status(500).json(err);
        }
    },







}