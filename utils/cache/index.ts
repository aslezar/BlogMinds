const NodeCache = require("node-cache")
const trendingCache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 600 })
export default trendingCache
