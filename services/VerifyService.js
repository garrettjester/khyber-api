/**
 * VERIFY SERVICE
 * --------------
 * A class for managing verification-related tasks.
 * Twilio Verify Documentation:
 * https://www.twilio.com/docs/verify/api/verification 
 */


 const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
);

const {ApolloError} = require('apollo-server-express')


class VerifyService {
    constructor() {
        this._verifyService = twilio.verify.services(process.env.TWILIO_VERIFICATION_SERVICE)
    }


    /** ---------------------------------------------
     * Creates a verification with Twilio's Verify
     * service. Can be sent via phone/email/voice.
     * Must be called before 'confirm'.
     * @param {String} channel - 'sms' or 'email'
     * @param {String} to - The phone number or email receiving the code. 
     * @param {String} locale - The geo region (see below).
     */
    async create(channel, to, locale) {
        return this._verifyService.verifications.create({
            to: to, channel: channel, locale: locale
        }).then(() => {
            return {
                success: true, 
                message: `Verification code successfully sent to ${to}`
            };
        }).catch((error) => {
            throw new ApolloError(error, 'VERIFY_ERROR')
        });   
    }


    
    /** ---------------------------------------------
     * Confirms a verification with Twilio's Verify
     * service via user-provided code.
     * @param {String} channel - 'sms' or 'email'
     * @param {String} to - The phone number or email receiving the code. 
     */
    async confirm(to, code) {
        return this._verifyService
        .verificationChecks.create({to, code}).then(({status}) => {
            if (status === 'approved') {
                return {
                    success: true, 
                    message: `${to} successfully verified.`
                }
            } else { 
                throw new ApolloError('Internal server error.', 'TWILIO_ERROR')
            }
        })
        .catch((error) => {
            console.log(error)
            throw new ApolloError(
                (error.code === 60022) ? 'Incorrect verification code.' :
                (error.status === 404) ? 'Verification code has expired.' :
                'Internal server error.'
            )
        })
    }
}

module.exports = VerifyService;
