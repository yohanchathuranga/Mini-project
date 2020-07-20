import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './app/components/Login';
import Dashboard from './app/components/Dashboard';
import SignUp from './app/components/SignUp';
import EmpList from './app/components/EmpList';
import AddUser from './app/components/AddUser';
import UserDetails from './app/components/UserDetails';
import Chat from './app/components/Chat';
import Notifications from './app/components/Notifications';
import AddNotification from './app/components/AddNotification';
import Test from './app/components/Test';
import Home from './app/components/Home';
import UserChat from './app/components/UserChat';
import Add from './app/components/Add';
import SplashScreen from './app/components/SplashScreen'
import {createDrawerNavigator} from 'react-native-drawer';

console.disableYellowBox = true;
const NavStack = createStackNavigator({
  SignUp: {
    screen: SignUp,
  },
  Login: {
    screen: Login,
  },
  Dashboard: {
    screen: Dashboard,
  },
  EmpList: {
    screen: EmpList,
  },
  AddUser: {
    screen: AddUser,
  },
  UserDetails: {
    screen: UserDetails,
  },
  Chat: {
    screen: Chat,
  },
  Home: {
    screen: Home,
  },
  Notifications: {
    screen: Notifications,
  },
  AddNotifications: {
    screen: AddNotification,
  },
  Test: {
    screen: Test,
  },
  UserChat: {
    screen: UserChat,
  },
  Add: {
    screen: Add,
  },
});
const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: NavStack
});
const AppNav = createAppContainer(InitialNavigator);

export default AppNav;
