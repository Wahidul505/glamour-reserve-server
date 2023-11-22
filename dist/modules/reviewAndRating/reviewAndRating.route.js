"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../app/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const user_1 = require("../../enums/user");
const reviewAndRating_controller_1 = require("./reviewAndRating.controller");
const reviewAndRating_validation_1 = require("./reviewAndRating.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT), (0, validateRequest_1.default)(reviewAndRating_validation_1.ReviewAndRatingValidation.create), reviewAndRating_controller_1.ReviewAndRatingController.insertIntoDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT), (0, validateRequest_1.default)(reviewAndRating_validation_1.ReviewAndRatingValidation.update), reviewAndRating_controller_1.ReviewAndRatingController.updateData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT), reviewAndRating_controller_1.ReviewAndRatingController.deleteData);
router.get('/', reviewAndRating_controller_1.ReviewAndRatingController.getReviews);
exports.ReviewAndRatingRoutes = router;
