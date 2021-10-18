import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import * as note from './controllers/note'
import * as pet from './controllers/pet'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

app.get('/notes', note.list)
app.get('/notes/:id', note.get)
app.post('/notes', note.create)
app.put('/notes', note.update)
app.delete('/notes', note.remove)

app.get('/pets', pet.list)
app.get('/pets/:id', pet.get)
app.post('/pets', pet.create)
app.put('/pets', pet.update)
app.delete('/pets', pet.remove)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
