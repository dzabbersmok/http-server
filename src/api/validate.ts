import { filterMessage } from "./helpers.js";
import { respondWithError, respondWithJSON } from "./json.js";
import { httpHandler } from "./readiness";

export const handlerValidateChirp: httpHandler = async (req, res) => {
    type parameters = {
        body: string;
    };
    const params: parameters = req.body;

    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        throw new Error("Chirp is too long");
    }

    const cleanedBody = filterMessage(params.body);

    respondWithJSON(res, 200, {
        cleanedBody
    });
}