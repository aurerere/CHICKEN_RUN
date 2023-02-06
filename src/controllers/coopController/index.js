import create from "./create.js";
import getAll from "./getAll.js";
import getOne from "./getOne.js";
import deleteOne from "./deleteOne.js";
import put from "./put.js";
import patch from "./patch.js";

const runController = {
    create,
    getAll,
    getOne,
    deleteOne,
    put,
    patch
}

export default runController;