import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, month, day } = request.body;

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentService,
    );

    const appointments = await listProviderAppointment.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(appointments);
  }
}