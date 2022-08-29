import React from "react";
import {connect} from "react-redux";
import {
    followSuccess,
    unfollowSuccess,
    followingInProgress,
    getUsersThunkCreator,
    onPageChangeThunkCreator,
    follow,
    unfollow
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {
    getCurrentPage,
    getFollowingInProg,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelector";


class UsersAPIComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (p) => {
        this.props.onPageChangeThunkCreator(p, this.props.pageSize);
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader/> :
                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChange={this.onPageChange}
                           users={this.props.users}
                           followSuccess={this.props.followSuccess}
                           unfollowSuccess={this.props.unfollowSuccess}
                           followingInProgress={this.props.followingInProgress}
                           followingInProg={this.props.followingInProg}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}

                    />

                } </div>
        )
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProg: state.usersPage.followingInProg
//
//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProg: getFollowingInProg(state)
    }
}


let AuthRedirectContainer = AuthRedirect(UsersAPIComponent);
const UsersContainer = connect(mapStateToProps, {followSuccess, unfollowSuccess, followingInProgress, getUsersThunkCreator, onPageChangeThunkCreator, follow, unfollow })(AuthRedirectContainer);

export default UsersContainer;