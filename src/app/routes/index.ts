import express from 'express';
import { AdminRoutes } from '../../modules/admin/admin.route';
import { AuthRoutes } from '../../modules/auth/auth.route';
import { BlogRoutes } from '../../modules/blog/blog.route';
import { BookingRoutes } from '../../modules/booking/booking.route';
import { CategoryRoutes } from '../../modules/category/category.route';
import { FAQRoutes } from '../../modules/faq/faq.route';
import { FeedbackRoutes } from '../../modules/feedback/feedback.route';
import { MakeoverServiceRoutes } from '../../modules/makeoverService/makeoverService.route';
import { ReviewAndRatingRoutes } from '../../modules/reviewAndRating/reviewAndRating.route';
import { UserRoutes } from '../../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/makeover-service',
    route: MakeoverServiceRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/review',
    route: ReviewAndRatingRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/faq',
    route: FAQRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
