const { SchemaDirectiveVisitor, ApolloError } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");
const getUserFromRequest = require("../../utils/middleware/attachUserToRequest");
const { getAccessTokenFromRequest } = require("../../utils/requestHandlers");
const passport = require('passport')
const passportService = require('../../utils/passport')
const requireAuth = passport.authenticate('jwt', {session: false})

class AuthDirective extends SchemaDirectiveVisitor {

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {

      // Get the required Role from the field first, falling back
      // to the objectType if no Role is required by the field:
      const requiredRole = field._requiredAuthRole;

      if (!requiredRole) {
        throw new ApolloError('Not authorized', 'UNAUTHORIZED')
      }

      const context = args[2];
      // User passport to check for user.

      return resolve.apply(this, args);
    }.bind(this);
  }
}
  
module.exports = AuthDirective;