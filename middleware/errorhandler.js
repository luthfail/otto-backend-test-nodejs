const errorHandler = (err, req, res, next) => {
    switch(err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            res.status(400).json({
                code: 400,
                status: "error",
                message: err.errors[0].message
            });
            break;
        case "INVALID":
            res.status(401).json({
                code: 401,
                status: "error",
                message: `ERROR Invalid email or password`
            });
        case "JsonWebTokenError":
            res.status(401).json({
                code: 401,
                status: "error",
                message: 'Invalid token'
            });
            break;
        case "FORBIDDEN":
            res.status(403).json({
                code: 403,
                status: "error",
                message: 'Forbidden'
            });
            break;
        case 'NOT_FOUND':
            res.status(404).json({
                code: 404,
                status: "error",
                message: 'Post not found'
            });
            break;
        case 'InternalServerError':
            res.status(404).json({
                code: 500,
                status: "error",
                message: 'Internal Server Error'
            });
            break;
        default :
            res.status(500).json({
                code: 500,
                status: "error",
                message: 'Internal Server Error'
            });
            break;
    }
}

module.exports = errorHandler;