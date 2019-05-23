import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { withRouter } from "react-router";
const { FETCH_CHANNEL } = Queries;
const { ADD_CHANNEL_USER, REMOVE_CHANNEL_USER } = Mutations;

class ChannelDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: ""
    };

    this.joinChannel = this.joinChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  joinChannel(e, addChannelUser, channelId) {
    e.preventDefault();
    addChannelUser({
      variables: {
        id: this.props.id,
      }
    });
  }

  leaveChannel(e, removeChannelUser) {
    e.preventDefault();
    removeChannelUser({
      variables: {
        id: this.props.id,
      }
    });
  }

  buttonSwitch(addChannelUser, channelId) {
    if (this.state.message.length > 0 ) {
      return ( <a className="go-channel-button" href={`/channels/${channelId}`}>Go to Channel</a> )
    } else {
      return ( <form onSubmit={e => this.joinChannel(e, addChannelUser, channelId)}>
        <button className="join-channel-button" type="submit">Join Channel</button>
      </form> )
    }
  }

  render() {
    return (
      <Query query={FETCH_CHANNEL} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          const fetchChannelData = data;
          // debugger;
          return (
            <div className="channels-box">
              
              <div className="channel-detail-box">
                <div className="channel-info-box">
                  <h3 className="channel-index-name"><a className="channel-index-link" href={`/channels/${fetchChannelData.channel._id}`}># {data.channel.name}</a></h3>    
                  <h4 className="channel-info"> Created by {data.channel.host_id} on Date </h4>  
                </div>  

                <div className="channel-button-box">      
                  <Mutation
                    mutation={ADD_CHANNEL_USER}
                    onError={err => this.setState({ message: err.message })}
                    onCompleted={data => {
                      const { name } = data.addChannelUser;
                      this.setState({
                        message: `You joined channel ${name}`
                      });
                    }}
                  >
                    {(addChannelUser, { data }) => (
                      <div>
                        {this.buttonSwitch(addChannelUser, fetchChannelData.channel._id)}
                      </div>
                      
                    )}
                  </Mutation>
                </div> 
              </div> 
              < hr/>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default withRouter(ChannelDetail);