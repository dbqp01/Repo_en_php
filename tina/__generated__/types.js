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
export const RoomsPartsFragmentDoc = gql`
    fragment RoomsParts on Rooms {
  __typename
  rooms {
    __typename
    id
    slug
    name_es
    name_en
    description_es
    description_en
    maxGuests
    beds
    pricePerNight
    amenities
    images
    photoFolder
    hasVideoTour
    amenityLabels {
      __typename
      wifi {
        __typename
        es
        en
      }
      breakfast {
        __typename
        es
        en
      }
      hot_water {
        __typename
        es
        en
      }
      heating {
        __typename
        es
        en
      }
      tv {
        __typename
        es
        en
      }
      laundry {
        __typename
        es
        en
      }
    }
  }
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  services {
    __typename
    id
    name_es
    name_en
    description_es
    description_en
    icon
  }
}
    `;
export const ReviewsPartsFragmentDoc = gql`
    fragment ReviewsParts on Reviews {
  __typename
  reviews {
    __typename
    name
    country
    rating
    text_es
    text_en
    date_es
    date_en
  }
}
    `;
export const SiteSettingsPartsFragmentDoc = gql`
    fragment SiteSettingsParts on SiteSettings {
  __typename
  hotelName
  phone
  phoneRaw
  email
  whatsappNumber
  streetAddress
  city
  region
  postalCode
  country
  address_es
  address_en
  latitude
  longitude
  checkinTime
  checkoutTime
  starRating
  priceRange
  siteDescription_es
  siteDescription_en
  socialLinks {
    __typename
    platform
    url
    label
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
export const RoomsDocument = gql`
    query rooms($relativePath: String!) {
  rooms(relativePath: $relativePath) {
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
    ...RoomsParts
  }
}
    ${RoomsPartsFragmentDoc}`;
export const RoomsConnectionDocument = gql`
    query roomsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: RoomsFilter) {
  roomsConnection(
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
        ...RoomsParts
      }
    }
  }
}
    ${RoomsPartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
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
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
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
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ReviewsDocument = gql`
    query reviews($relativePath: String!) {
  reviews(relativePath: $relativePath) {
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
    ...ReviewsParts
  }
}
    ${ReviewsPartsFragmentDoc}`;
export const ReviewsConnectionDocument = gql`
    query reviewsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ReviewsFilter) {
  reviewsConnection(
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
        ...ReviewsParts
      }
    }
  }
}
    ${ReviewsPartsFragmentDoc}`;
export const SiteSettingsDocument = gql`
    query siteSettings($relativePath: String!) {
  siteSettings(relativePath: $relativePath) {
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
    ...SiteSettingsParts
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const SiteSettingsConnectionDocument = gql`
    query siteSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteSettingsFilter) {
  siteSettingsConnection(
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
        ...SiteSettingsParts
      }
    }
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
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
    },
    rooms(variables, options) {
      return requester(RoomsDocument, variables, options);
    },
    roomsConnection(variables, options) {
      return requester(RoomsConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    reviews(variables, options) {
      return requester(ReviewsDocument, variables, options);
    },
    reviewsConnection(variables, options) {
      return requester(ReviewsConnectionDocument, variables, options);
    },
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
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
