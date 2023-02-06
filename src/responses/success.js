/**
 *
 * @param res {Object}
 * @param status {Number}
 * @param message {String}
 * @param {Object} [data]
 */
export default function success(res, status, message, data)
{
    if (!data)
        return res.status(status).send({
            status,
            message,
        });

    else
        return res.status(status).send({
            status,
            message,
            data
        });
}