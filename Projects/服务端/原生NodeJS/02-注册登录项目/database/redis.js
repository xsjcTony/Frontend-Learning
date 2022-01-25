import { createClient } from 'redis'
import { REDIS_CONFIG } from '../config/database.js'


const client = createClient(REDIS_CONFIG.url)

client.on('error', (err) => {
  console.error('Redis client error:\n', err)
})

await client.connect()

const set = async (key, value) => await client.set(key, JSON.stringify(value))

const get = async (key) => {
  const value = await client.get(key)

  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}


export default {
  set,
  get
}
