const { getDetails, getUserGraph } = require("./tableau.service");

module.exports = {
    getDetailById,
    getUserGraphById,
};
/* get view details */
async function getDetailById(req, res, next) {
    const ticket = await getDetails(next);
    console.log(ticket);
    if (!ticket) {
        return;
    }
    return res.status(200).json(ticket);
}

async function getUserGraphById(req, res, next) {
    const result = await getUserGraph();
    return res.status(200).json(result);
}
