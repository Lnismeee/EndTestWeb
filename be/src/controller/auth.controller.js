import AuthService from '../services/Auth.service.js';
import asyncHandler from '../utils/async-handler.js';

const AuthController = {

    login: asyncHandler(async (req, res) => {
        await AuthService.login(req, res);
    }),
    register: asyncHandler(async (req, res) => {
        await AuthService.register(req, res);
    }),
    logout: asyncHandler(async (req, res) => {
        await AuthService.logout(req, res);
    }),
}

export default AuthController