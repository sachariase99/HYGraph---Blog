import { gql } from "graphql-request";

export const getAllBlogs = gql`
query Blogs {
  blogs {
    date
    id
    image {
      id
      fileName
      url
    }
    description {
      html
      markdown
      text
      raw
    }
    headingText {
      html
      markdown
      text
      raw
    }
  }
}
`;
