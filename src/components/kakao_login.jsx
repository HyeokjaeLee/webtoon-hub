import React, { Component } from 'react';
import KaKaoLogin from 'react-kakao-login';

let userid;
class KakaoSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'kakao'
        }
    }
    
    responseKaKao = (res) => {
        this.setState({
            data: res
        })
        userid=this.state.data.profile.id
        this.props.setUserid(userid)      
    }

    responseFail = (err) => {
    }

    render() {
        
        return (
            <>
                    <KaKaoLogin
                        onSuccess={this.responseKaKao}
                        getProfile={true}
                    />
            </>
        );
    }
}
export default KakaoSignUp;