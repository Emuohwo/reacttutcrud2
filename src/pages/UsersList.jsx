import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components';
import 'react-table/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px;
`

const Update = styled.div`
    color:#ef9bof;
    cursor: pointer;
`
const Delete = styled.div`
    color:#ff0000;
    cursor: pointer;
`

class UpdateUser extends Component {
    updaterUser = event => {
        event.preventDefault()

        window.location.href = `/users/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updaterUser}>Edit</Update>
    }
}

class DeleteUser extends Component {
    deleteUser = e => {
        e.preventDefault()

        if (
            window.confirm(
                `User ${this.props.id} will be deleted permanently`,
            )
        ) {
            api.deleteUserById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Del</Delete>
    }
}

class UsersLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllUsers().then(users => {
            this.setState({
                users: users.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { users, isLoading } = this.state;
        console.log('UsersList is showing: ', users);
        const columns = [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
            },
            {
                Header: 'First Name',
                accessor: 'first',
                filterable: true,
            },
            {
                Header: 'Last Name',
                accessor: 'last',
                filterable: true,
            },
            {
                Header: 'Email',
                accessor: 'email',
                filterable: true,
            },
            {
                Header: 'Phone',
                accessor: 'phone',
                filterable: true,
            },
            {
                Header: 'Location',
                accessor: 'location',
                filterable: true,
            },
            {
                Header: 'Hobby',
                accessor: 'hobby',
                filterable: true,
            }, 
            // {
            //     Header: 'Time',
            //     accessor: 'time',
            //     Cell: props => <span>{props.value.join(' / ')}</span>,
            // },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteUser id={props.original.id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateUser id={props.original.id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true;
        if (!users.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                      data={users}
                      columns={columns}
                      loading={isLoading}
                      defaultPageSize={10}
                      showPageSizeOptions={true}
                      minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default UsersLists;
