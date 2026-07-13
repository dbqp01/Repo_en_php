export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  title_es
  title_en
  purpose_es
  purpose_en
  mission_es
  mission_en
  vision_es
  vision_en
  values {
    __typename
    title_es
    title_en
    description_es
    description_en
  }
}
    `;
export const ExplorePartsFragmentDoc = gql`
    fragment ExploreParts on Explore {
  __typename
  attractions {
    __typename
    id
    name_es
    name_en
    description_es
    description_en
    distance
    travelTime
    category
    history_es
    history_en
    howToGet_es
    howToGet_en
    tips_es
    tips_en
    bestTime_es
    bestTime_en
    image
  }
}
    `;
export const FaqPartsFragmentDoc = gql`
    fragment FaqParts on Faq {
  __typename
  questions {
    __typename
    question_es
    question_en
    answer_es
    answer_en
  }
}
    `;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const ExploreDocument = gql`
    query explore($relativePath: String!) {
  explore(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ExploreParts
  }
}
    ${ExplorePartsFragmentDoc}`;
export const ExploreConnectionDocument = gql`
    query exploreConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ExploreFilter) {
  exploreConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ExploreParts
      }
    }
  }
}
    ${ExplorePartsFragmentDoc}`;
export const FaqDocument = gql`
    query faq($relativePath: String!) {
  faq(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqParts
  }
}
    ${FaqPartsFragmentDoc}`;
export const FaqConnectionDocument = gql`
    query faqConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqFilter) {
  faqConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqParts
      }
    }
  }
}
    ${FaqPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    explore(variables, options) {
      return requester(ExploreDocument, variables, options);
    },
    exploreConnection(variables, options) {
      return requester(ExploreConnectionDocument, variables, options);
    },
    faq(variables, options) {
      return requester(FaqDocument, variables, options);
    },
    faqConnection(variables, options) {
      return requester(FaqConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
