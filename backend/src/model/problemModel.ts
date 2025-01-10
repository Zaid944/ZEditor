import mongoose from "mongoose";

export const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    problemImage: {
        type: String,
    },
    //doubt
    sample_tc: {
        type: [
            new mongoose.Schema({
                image: {
                    type: String,
                },
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
                explanation: {
                    type: String,
                },
            }),
        ],
        required: true,
    },
    final_tc: {
        type: String,
    },
    constraints: {
        type: [String],
    },
    topics: {
        type: [String],
    },
    difficulty: {
        type: String,
    },
});

export const problemModel = mongoose.model("problemModel", problemSchema);
