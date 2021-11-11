import request from '@/api/request'

export const getTourism = async (type, { city, top, skip, filter }) => {
  const url = city ? `/${type}/${city}` : `/${type}`
  try {
    return await request.get(url, {
      params: {
        $filter: filter,
        $top: top,
        $skip: skip,
        $format: 'JSON'
      }
    })
  } catch (err) {
    return []
  }
}
