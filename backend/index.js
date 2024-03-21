import app from './server.js'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})