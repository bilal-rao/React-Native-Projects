import React from 'react';
import { StackNavigator } from 'react-navigation';
import LogIn from './src/components/login/login';
import SignUp from './src/components/signup/signup';
import CreateGroup from './src/components/createGroup/createGroup';
import GroupList from './src/components/groupList/groupList';
import App from './src/components/App';
import AdminProfile from './src/components/groupAdminProfile/adminProfile';
import Invitation from './src/components/invitation/inviteCode';
import JoinCircle from './src/components/joinCircle/circleJoin';
import MemberList from './src/components/membersList/membersList';

const Routes = StackNavigator({

    login: {
        screen: LogIn,
        navigationOptions: {
            header: null
        }
    },
    signup: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    },
    home: {
        screen: App,
        navigationOptions: {
            header: null
        }
    },
    groups: {
        screen: CreateGroup,
        navigationOptions: {
            header: null
        }
    },

    groupList: {
        screen: GroupList,
        navigationOptions: {
            header: null
        }
    },
    adminProfile: {
        screen: AdminProfile,
        navigationOptions: {
            header: null
        }
    },
    inviteCode: {
        screen: Invitation,
        navigationOptions: {
            header: null
        }
    },
    joinCircle: {
        screen: JoinCircle,
        navigationOptions: {
            header: null
        }
    },
    membersList: {
        screen: MemberList,
        navigationOptions: {
            header: null
        }
    },
});

export default Routes;