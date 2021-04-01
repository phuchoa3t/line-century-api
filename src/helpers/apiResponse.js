const successResponse = function (res, msg, option = {}) {
    const data = {
        status: 200,
        message: msg,
    };
    if (option.returnData === true) {
        return data;
    }
    return res.status(200).json(data);
};

const successResponseWithData = function (res, msg, data, option = {}) {
    const resData = {
        status: 200,
        message: msg,
        data,
    };
    if (option.returnData === true) {
        return resData;
    }
    return res.status(200).json(resData);
};

const successResponseCreating = function (res, msg, data, option = {}) {
    const resData = {
        status: 201,
        message: msg,
        data,
    };
    if (option.returnData === true) {
        return resData;
    }
    return res.status(201).json(resData);
};

const successResponseEditing = function (res, msg, data, option = {}) {
    const resData = {
        status: 204,
        message: msg,
        data,
    };

    if (option.returnData === true) {
        return resData;
    }
    return res.json(resData);
};

const successResetContent = function (res, msg, data, option = {}) {
    const resData = {
        status: 205,
        message: msg,
        data,
    };
    if (option.returnData === true) {
        return resData;
    }
    return res.json(resData);
};

const errorResponse = function (res, msg, option = {}) {
    console.log(msg);
    const data = {
        status: 500,
        message: msg,
    };
    if (option.returnData === true) {
        return data;
    }
    return res.status(500).json(data);
};

const notFoundResponse = function (res, msg, dataResponse = {}, option = {}) {
    const data = {
        status: 404,
        message: msg,
        ...dataResponse,
    };

    if (option.returnData === true) {
        return data;
    }
    return res.status(404).json(data);
};

const validationErrorWithData = function (res, msg, data, option = {}) {
    const resData = {
        status: 400,
        message: msg,
        data,
    };
    if (option.returnData === true) {
        return resData;
    }
    return res.status(400).json(resData);
};

const unauthorizedResponse = function (res, msg, option = {}) {
    const data = {
        status: 401,
        message: msg,
    };
    if (option.returnData === true) {
        return data;
    }
    return res.status(401).json(data);
};

const InvalidArgumentException = function (res, msg, option = {}) {
    const data = {
        status: 422,
        message: msg,
    };
    if (option.returnData === true) {
        return data;
    }
    return res.status(422).json(data);
};

const response = function (res, statusCode, data) {
    return res.status(statusCode || 200).json(data);
};

module.exports = {
    successResponse,
    successResponseWithData,
    successResponseCreating,
    successResponseEditing,
    successResetContent,
    errorResponse,
    notFoundResponse,
    validationErrorWithData,
    unauthorizedResponse,
    InvalidArgumentException,
    response,
};
