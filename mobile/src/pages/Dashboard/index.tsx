import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import IProvider from './types';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

const Dashboard: React.FC = () => {
  const [providers, SetProviders] = useState<IProvider[]>([]);

  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      SetProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    // navigate('Profile');
    // Só por enquanto para fazer o logout da aplicação
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <UserName>{item.name}</UserName>}
      />
    </Container>
  );
};

export default Dashboard;
