const uuidRegex = new RegExp('[0-9A-Fa-f]{4}(-?[0-9A-Fa-f]{4}){7}')

const emailRegex = new RegExp(
    `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]` +
        `{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`,
)

export const isValidUUID = (uuid: string): boolean => uuidRegex.test(uuid)

export const isValidEmail = (email: string): boolean => !email.includes(' ') && emailRegex.test(email)
