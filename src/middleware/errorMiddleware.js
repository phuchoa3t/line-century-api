const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const Error = require('@utils/apiError');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
// eslint-disable-next-line no-unused-vars
const handler = (err, req, res, next) => {
    let response = {
        status: err.status,
        errors: err.errors,
        message: err.message || httpStatus[err.status],
        stack: err.stack,
    };

    if (err.data && Object.keys(err.data).length) {
        response = { ...response, ...err.data };
    }

    if (err.status) {
        res.status(err.status);
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
    res.json(response);
};

/**
 * If error is not an instanceOf {Error}, convert it.
 * @public
 */
// eslint-disable-next-line no-unused-vars
const converter = (err, req, res, next) => {
    let convertedError = err;

    if (err instanceof expressValidation.ValidationError) {
        let messages = [];

        let validataOptions = [
            'headers',
            'params',
            'query',
            'payload',
            'state',
            'failAction',
            'body',
        ];

        validataOptions.forEach((validataOption) => {
            if (
                Array.isArray(err.details[validataOption]) &&
        err.details[validataOption].length
            ) {
                messages.push(err.details[validataOption][0].message);
            }
        });
        convertedError = new Error({
            errors: err.errors,
            message: messages.join(', '),
            status: 422,
        });
    } else if (!(err instanceof Error)) {
        convertedError = new Error({
            message: err.message,
            // stack: err.stack,
            status: err.status,
        });
    }

    return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res) => {
    const err = new Error({
        message: 'Page not found',
        status: httpStatus.NOT_FOUND,
    });

    return handler(err, req, res);
};

module.exports = {
    handler,
    converter,
    notFound,
};
