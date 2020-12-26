// main.js will be the file thats called after landing, login, and register

import React, { Component } from 'react'
import {View, Text} from 'react-native'

// in order access fetch user function
// connect allows us to connect to redux
import {connect} from 'react-redux'
// need to bind our actions to these components
import {bindActionCreators, bindActionCreatos} from 'redux'
import {fetchUser} from '../redux/Actions/index'

// ------------------------------------------------------------------------------------

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }

    render() {
        return (
            <View style = {{flex: 1, justifyContent: 'center'}}>
                <Text> User is Logged In </Text>
            </View>
        )
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(null, mapDispatchProps)(Main);
