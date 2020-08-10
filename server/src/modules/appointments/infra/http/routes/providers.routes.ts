import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilitiesController from '../controllers/ProviderMonthAvailabilitiesController';
import ProviderDayAvailabilitiesController from '../controllers/ProviderDayAvailabilitiesController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilitiesController = new ProviderMonthAvailabilitiesController();
const providerDayAvailabilitiesController = new ProviderDayAvailabilitiesController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilitiesController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilitiesController.index,
);

export default providersRouter;
