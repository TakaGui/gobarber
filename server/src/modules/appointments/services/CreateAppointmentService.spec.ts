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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    // appointmentDate: 2020/05/10 13:00:00
    const appointmentDate = new Date(2020, 4, 10, 13);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      user_id: '132123',
      provider_id: '123321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123321');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    // appointmentDate: 2020/05/10 13:00:00
    const appointmentDate = new Date(2020, 4, 10, 12);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '132123',
      provider_id: '123321',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '132123',
        provider_id: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '132123',
        provider_id: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
