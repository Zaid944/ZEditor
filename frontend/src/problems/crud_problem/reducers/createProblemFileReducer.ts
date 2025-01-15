/**
export const updateProblemSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    problemImage: z.string().optional(),
    sample_tc: z.array(testCaseSchema).optional(),
    final_tc: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    topics: z.array(z.string()).optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});

export const testCaseSchema = z.object({
    image: z.string().optional(),
    input: z.string(),
    output: z.string(),
    explanation: z.string(),
});
 */
export type createProblemFileType = {
    problemImage?: File | null;
};

export enum createProblemFileActionType {
    SET_PROBLEM_IMAGE,
}

export type createProblemFileAction = {
    type: createProblemFileActionType;
    payload: createProblemFileType;
};

export const createProblemFileInitialState: createProblemFileType = {
    problemImage: null,
};

export const createProblemFileReducer = (
    state: createProblemFileType,
    action: createProblemFileAction
) => {
    switch (action.type) {
        case createProblemFileActionType.SET_PROBLEM_IMAGE:
            return { ...state, problemImage: action.payload.problemImage };
        default:
            return state;
    }
};
