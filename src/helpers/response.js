module.exports = {
    success: (res,data,message) => {
        const result = {
            message,
            success: true,
            status: 200,
            data
        }
        res.json(result)
    },
    failed: (res,data,message) => {
        const result = {
            message,
            success: false,
            status: 500,
            data
        }
        res.json(result)
    },
    tokenResult: (res,data,message) => {
        const result = {
            message: message,
            success: true,
            code: 200,
            data: data,
        }
        res.json(result)
    }
}