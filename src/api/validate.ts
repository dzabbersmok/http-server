import { respondWithError, respondWithJSON } from "./json.js";
import { httpHandler } from "./readiness";

export const handlerValidateChirp: httpHandler = async (req, res) => {
    type parameters = {
        body: string;
    };
    const params: parameters = req.body;

    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        respondWithError(res, 400, "Chirp is too long");
        return;
    }

    respondWithJSON(res, 200, {
        valid: true,
    });
}