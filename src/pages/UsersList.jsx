import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components';
import 'react-table/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px;
`

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
                Header: 'First',
                accessor: 'first',
                filterable: true,
            },
            {
                Header: 'Last',
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
