/**
 *
 * @param res {Object}
 * @param status {Number}
 * @param message {String}
 */
export default function error(res, status, message)
{
    return res.status(status).send({
        status,
        error: message
    });
}