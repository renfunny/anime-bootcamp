const {User} = require("../models");
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require("../utils/auth");

const resolvers = {
    
    Query: {
        me: async(parent, args, context) => {
            if(context.user) {//if there is a user logged in
                const userData = await User.findOne({_id: context.user._id}).select("-__v -password")
            
                return userData;
            }//if not
            throw new AuthenticationError("You are not Logged In");
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async(parent, {email, password}) => {
            
            const user = await User.findOne({email});
            if(!user){//if the user input for email is wrong
                throw new AuthenticationError("Could not find email");//err msg
            }

            const pw = await user.isCorrectPassword(password);
            if(!pw){//if the password is wrong
                throw new AuthenticationError("Wrong password");//err msg
            }

            const token = signToken(user);//give the user a json web token for logging in
            return {token, user};
        },
        saveBook: async(parent, {input}, context) => {
            if(context.user){//this can only work if the user is logged in
                const updatedUser = await User.findByIdAndUpdate({_id: context.user._id}, {$addToSet: {savedBooks: input}}, {new: true});
                return updatedUser;
            }//if they are not logged in, they cannot use the feature
            throw new AuthenticationError("You need to be logged in to use this feature!");
        },
        removeBook: async(parent, args, context) => {
            if(context.user){//this can only work if the user is logged in
                const updatedUser = await User.findOneAndUpdate({_id: context.user._id}, {$pull: {savedBooks: {bookId: args.bookId}}}, {new: true});
                return updatedUser;
            };//if they are not logged in, they cannot use the feature
            throw new AuthenticationError("You need to be logged in to use this feature!");
        }
    }
};

module.exports = resolvers;