interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'guilherme.takahashi01@fatec.sp.gov.br',
      name: 'Takahashi da Fatec',
    },
  },
} as IMailConfig;
