"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../../modules/admin/admin.route");
const auth_route_1 = require("../../modules/auth/auth.route");
const blog_route_1 = require("../../modules/blog/blog.route");
const booking_route_1 = require("../../modules/booking/booking.route");
const category_route_1 = require("../../modules/category/category.route");
const faq_route_1 = require("../../modules/faq/faq.route");
const feedback_route_1 = require("../../modules/feedback/feedback.route");
const makeoverService_route_1 = require("../../modules/makeoverService/makeoverService.route");
const reviewAndRating_route_1 = require("../../modules/reviewAndRating/reviewAndRating.route");
const user_route_1 = require("../../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/makeover-service',
        route: makeoverService_route_1.MakeoverServiceRoutes,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/review',
        route: reviewAndRating_route_1.ReviewAndRatingRoutes,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRoutes,
    },
    {
        path: '/blog',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/faq',
        route: faq_route_1.FAQRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
