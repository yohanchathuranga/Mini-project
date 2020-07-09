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
import {createDrawerNavigator} from 'react-native-drawer';

console.disableYellowBox = true;

const NavStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  SignUp: {
    screen: SignUp,
  },
  Login: {
    screen: Login,
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
});

const AppNav = createAppContainer(NavStack);

export default AppNav;
