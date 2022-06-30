const errorHandler = (err, req, res, next) => {
    switch(err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            res.status(400).json({
                code: 400,
                status: "BAD REQUEST",
                message: err.errors[0].message
            });
            break;
        case "INVALID":
            res.status(401).json({
                code: 401,
                status: "UNAUTHORIZED",
                message: `ERROR Invalid email or password`
            });
        case "JsonWebTokenError":
            res.status(401).json({
                code: 401,
                status: "UNAUTHORIZED",
                message: 'Invalid token'
            });
            break;
        case "FORBIDDEN":
            res.status(403).json({
                code: 403,
                status: "FORBIDDEN",
                message: 'Forbidden'
            });
            break;
        case 'NOT_FOUND':
            res.status(404).json({
                code: 404,
                status: "NOT FOUND",
                message: 'Post not found'
            });
            break;
        case 'InternalServerError':
            res.status(404).json({
                code: 500,
                status: "INTERNAL SERVER ERROR",
                message: 'Internal Server Error'
            });
            break;
        default :
            res.status(500).json({
                code: 500,
                status: "INTERNAL SERVER ERROR",
                message: 'Internal Server Error'
            });
            break;
    }
}

module.exports = errorHandler;