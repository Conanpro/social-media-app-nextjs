import { gql } from "@apollo/client";

const LoginMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignUpMutation = gql`
  mutation signUp($email: String!, $password: String!, $username: String!) {
    signUp(email: $email, password: $password, username: $username)
  }
`;

const GET_BLOGS = gql`
  query blogFeed($page: Int) {
    blogFeed(page: $page) {
      blogs {
        id
        content
        title
        favoriteCount
        author {
          username
          id
          avatar
        }
        createdAt
      }
    }
  }
`;

const GET_POSTS = gql`
  query Query {
    blogs {
      id
      content
      title
      createdAt
      author {
        username
        avatar
      }
    }
  }
`;

const GET_BLOG = gql`
  query getBlog($id: ID!) {
    getBlog(id: $id) {
      id
      createdAt
      content
      title
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const GET_MY_BLOGS = gql`
  query myBlogs($page: Int) {
    me {
      id
      username
      blogFeed(page: $page) {
        blogs {
          id
          createdAt
          content
          title
          favoriteCount
          author {
            username
            id
            avatar
          }
        }
      }
    }
  }
`;

const GET_ME = gql`
  query me {
    me {
      username
      id
      avatar
      email
      favorites {
        blogs {
          id
        }
      }
    }
  }
`;

const getMe = gql`
  query Me {
    me {
      username
      avatar
    }
  }
`;

const EDIT_BLOG = gql`
  mutation updateBlog($id: ID!, $content: String!) {
    updateBlog(id: $id, content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const ADD_POST = gql`
  mutation PostBlog($content: String!, $title: String!) {
    postBlog(content: $content, title: $title) {
      id
    }
}
`

const DELETE_BLOG = gql`
  mutation deleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;

const GET_MY_FAVORITES = gql`
  query favorites($page: Int) {
    me {
      favorites(page: $page) {
        blogs {
          id
          createdAt
          content
          title
          favoriteCount
          author {
            username
            id
            avatar
          }
        }
      }
    }
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;

export {
  ADD_POST,
  GET_POSTS,
  GET_BLOG,
  GET_BLOGS,
  GET_MY_BLOGS,
  GET_MY_FAVORITES,
  GET_ME,
  EDIT_BLOG,
  DELETE_BLOG,
  TOGGLE_FAVORITE,
  LoginMutation,
  SignUpMutation,
  getMe
};
