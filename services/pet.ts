import { IPet } from "../types/IPet"
import * as db from '../libs/mysql'

const list = async () => {
    const result = await db.execute('select * from pets')
    return result.rowns
}

const get = async (id: string) => {
    if (!id) {
      throw new Error("Informe o campo id!")
    }
    
    const pet = await db.execute('select * from pets where id=?', [id])
  
    if (!pet) {
        throw new Error("Nenhum pet encontrada para o id informado!")
    }
  
    return pet.rowns
}

const create = async (pet: IPet) => {
    if (!pet.name) {
        throw new Error("Informe o campo NOME !")
    }
  
    if (!pet.age) {
        throw new Error("Informe o campo IDADE !")
    }
    if (!pet.owner) {
        throw new Error("Informe o campo DONO! ")
    }
    if (!pet.raca) {
        throw new Error("Informe o campo RAÇA ! ")
    }

    await db.execute('insert into pets (name, age, owner, raca) values (?, ?, ?, ?)', [pet.name, pet.age, pet.owner, pet.raca])

    return true
  
}

const update = async (pet: IPet) => {
    if (!pet.id) {
        throw new Error("Informe o campo id!")
    }
  
    const petFound = await db.execute('select * from notes where id=?', [pet.id])
  
    if (!petFound) {
      throw new Error("Nenhuma anotação encontrada para o id informado!")
    }
  
    if (!pet.name) {
        throw new Error("Informe o campo nome!")
    }
  
    if (!pet.age) {
        throw new Error("Informe o campo idade!")
    }
    if (!pet.owner) {
        throw new Error("Informe o campo dono!")
    }
    if (!pet.raca) {
        throw new Error("Informe o campo raça!")
    }
  
    await db.execute('update pets set name=?, owner=?, age=?, where id=?, raca=?', [pet.name, pet.age, pet.owner, pet.id, pet.raca])
  
    return true
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }
  
    const pet = await db.execute('select * from pets where id=?', [id])
    if (!pet) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }
  
    await db.execute('delete from notes where id=?', [id])
  
    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
