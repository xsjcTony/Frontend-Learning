import { createClient } from 'redis'

const client = createClient({
  url: 'redis://127.0.0.1:6379/1'
})

client.on('error', (err) => {
  console.error(err)
  client.quit()
})

await client.connect()

/*
const res = await client.set('name', 'Lily')
console.log(res)
*/


/*
const res = await client.GET('name')
console.log(res)
*/


await client.sendCommand(['HMSET', 'user', 'name', 'Tony', 'age', '24'])
const res = await client.hGetAll('user')
console.log(res)

await client.quit()
