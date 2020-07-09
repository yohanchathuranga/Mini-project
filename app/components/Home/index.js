import * as React from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';

const Home = ({navigation}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'menu' : 'menu'}
          actions={[
            {icon: 'plus', onPress: () => navigation.navigate('Dashboard')},
            {
              icon: 'briefcase',
              label: 'Employees',
              onPress: () => navigation.navigate('EmpList'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => navigation.navigate('Notifications'),
            },
            {
              icon: 'bell',
              label: 'Notifications',
              onPress: () => navigation.navigate('Notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default Home;
