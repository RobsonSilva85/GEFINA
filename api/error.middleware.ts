import type { ErrorRequestHandler } from "express";


const handleError: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error);

    response.status(500).json({
        error: {
            status: 500,
            message: 'Não foi possível concluir operação. '
        }
    })
};

export default handleError;