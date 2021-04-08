const API_URL = process.env.WP_API_URL

const fetchAPI = async (query, { variables } = {}) => {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch('http://www.example2.dev.cc/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  })

  const json = await res.json()

  if (json.errors) {
    console.log(json.errors)
    console.log('error', query, variables)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export const getAllPosts = async (preview) => {
  const data = await fetchAPI(
    `
        query AllPosts {
            posts {
              edges {
                node {
                  id
                  date
                  title
                  slug
                }
              }
            }
          }
        `
  )

  return data?.posts
}

export const getAllPostsWithSlug = async () => {
  const data = await fetchAPI(
    `
        query MyQuery {
            posts {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
  )

  return data?.posts
}

export const getPost = async (slug) => {
  const data = fetchAPI(
    ` 
    fragment PostFields on Post {
            title
            excerpt
            slug
            date
              }
          query PostBySlug($id: ID!, $idType: PostIdType!) {
            post(id: $id, idType: $idType) {
              ...PostFields
              content
            }
          }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  )

  return data
}
