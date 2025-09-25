import { createUser } from "../db/queries/users.js";
import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";
import { httpHandler } from "./readiness.js";

export const handlerCreateUser: httpHandler = async (req, res) => {
    type parameters = {
        email: string;
    };
    const params: parameters = req.body;

    if (!params.email) {
        throw new BadRequestError("email address missing");
    }

    const user = await createUser({ email: params.email});

    respondWithJSON(res, 201, {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });

}