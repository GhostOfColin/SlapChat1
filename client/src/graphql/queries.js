import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client,
    }
  `,
  FETCH_CHANNELS: gql`
    query fetchChannels {
      channels {
        _id
        host_id
        name
        users {
          _id
          name
          email
        }
      }
    }
  `,
  FETCH_CHANNEL: gql`
    query fetchChannel($id: ID!) {
      channel(_id: $id) {
        _id
        host_id
        name
        users {
          _id
          name
          email
        },
        messages {
          _id
          user_id
          body
          date
          channel
        }
      }
    }
  `,
  FETCH_MESSAGES: gql`
    query fetchMessages {
      messages {
        _id
        user_id
        body
        date
        channel
      }
    }
  `,
  FETCH_USER_MESSAGES: gql`
    query fetchUserMessages {
      fetchUserMessages {
        _id
      }
  }
  `,
  FETCH_DIRECT_MESSAGES: gql`
    query getDirectMessages($id: ID!) {
      directmessage(_id: $id) {
        _id
        users {
          _id
          email
        }
        messages {
          date
          body
        }
      }
    }
  `
};