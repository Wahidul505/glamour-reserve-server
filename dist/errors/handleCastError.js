"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a;
    let errors = [];
    let message = '';
    const statusCode = 400;
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found';
        errors = [
            {
                path: '',
                message,
            },
        ];
    }
    else if (error.code === 'P2003') {
        if (error === null || error === void 0 ? void 0 : error.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    return {
        statusCode,
        message: 'Client/ Cast Error',
        errorMessages: errors,
    };
};
exports.default = handleClientError;
