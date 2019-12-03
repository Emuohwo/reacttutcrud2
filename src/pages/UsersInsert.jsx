import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`
const Button = styled.button.attrs({
    className: 'btn btn-primary',
})`
    margin: 15px 15px 15px 15px;
`

const CancelButton = styled.a.attrs({
    className: 'btn btn-danger',
})`
margin: 15px 15px 15px 15px;
`

class UsersInsert extends Component {
    constructor(props){
        super(props)

        this.state = {
            first: '',
            last: '',
            email: '',
            phone: '',
            location: '',
            hobby: '',
        }
    }

    handleChangeInputFirst = async e => {
        const first = e.target.value
        this.setState({first})
    }

    handleChangeInputLast = async e => {
        const last = e.target.value
        this.setState({last})
    }

    handleChangeInputEmail = async e => {
        const email = e.target.value
        this.setState({email})
    }

    handleChangeInputPhone = async e => {
        const phone = e.target.value
        this.setState({phone})
    }

    handleChangeInputLocation = async e => {
        const location = e.target.value
        this.setState({location})
    }

    handleChangeInputHobby = async e => {
        const hobby = e.target.value
        this.setState({hobby})
    }

    handleIncludeUser = async () => {
        const { first, last, email, phone, location, hobby } = this.state
        const payload = { first, last, email, phone, location, hobby }

        await api.insertUser(payload).then(res => {
            window.alert(`User added successfully`)
            this.setState({
                first: '',
                last: '',
                email: '',
                phone: '',
                location: '',
                hobby: '',
            })
        })
    }

    render() {
        const { first, last, email, phone, location, hobby } = this.state
        return (
            <Wrapper>
                <Title>Add User</Title>

                <Label>First Name</Label>
                <InputText 
                  type="text"
                  value={first}
                  onChange={this.handleChangeInputFirst}
                />

                <Label>Last Name</Label>
                <InputText 
                  type="text"
                  value={last}
                  onChange={this.handleChangeInputLast} 
                />

                <Label>Email</Label>
                <InputText 
                  type="email"
                  value={email}
                  onChange={this.handleChangeInputEmail}
                />

                <Label>Phone</Label>
                <InputText 
                  type="tel"
                  value={phone}
                  onChange={this.handleChangeInputPhone}
                />

                <Label>Location</Label>
                <InputText 
                  type="text"
                  value={location}
                  onChange={this.handleChangeInputLocation}
                />

                <Label>Hobby</Label>
                <InputText
                  type="text"
                  value={hobby}
                  onChange={this.handleChangeInputHobby}
                />

                <Button onClick={this.handleIncludeUser}>Save</Button>
                <CancelButton href={'/users/list'}>Cancel</CancelButton>

            </Wrapper>
        );
    }
}

export default UsersInsert;
