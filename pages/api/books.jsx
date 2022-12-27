import path from "path"
import fs from 'fs'

const getData = () => {
    const pathFile = path.join(process.cwd(), "data", "books.json")
        const readFile = fs.readFileSync(pathFile)
        const data = JSON.parse(readFile) 
        return data 
}

export default function handler(req, res) {
    if(req.method === "GET"){
      const data =   getData()
    res.status(200).json({ booksData: data })
    } else if(req.method === "POST"){
        const {name, description, imgUrl} = req.body
        const newBooks = {
            name,
            description,
            imgUrl,
            id: Date.now()
        }
        const pathFile = path.join(process.cwd(), "data", "books.json")
        const data =   getData()
        data.push(newBooks)
        fs.writeFileSync(pathFile, JSON.stringify(data))

        return res.status(201).json({message: "added", book: newBooks})
    }
  }