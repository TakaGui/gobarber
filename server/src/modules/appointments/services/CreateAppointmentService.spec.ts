import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123321');
  });

  it('should not be able to create two appointments on the same time', async () => {
    // appointmentDate: 2020/05/10 11:00:00
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123321',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
