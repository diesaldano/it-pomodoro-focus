export interface errors {
    response: {
        status: number | string,
        data: {
            errors: {
                message: string,
                duration: number
            }
        }
    },
}