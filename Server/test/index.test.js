const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        })
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const { body } = await agent.get('/rickandmorty/character/1');

            expect(body).toHaveProperty("id")
            expect(body).toHaveProperty("name")
            expect(body).toHaveProperty("species")
            expect(body).toHaveProperty("gender")
            expect(body).toHaveProperty("status")
            expect(body).toHaveProperty("origin")
            expect(body).toHaveProperty("image")
        })
        it('Si hay un error responde con status: 500', async () => {
            await agent.get('/rickandmorty/character/11111').expect(500);
        })
    })
    describe('GET /rickandmorty/login', () => {
        it('login Ok', async () => {
            const cadena = '?email=diegolepore01@gmail.com&password=987654'
            const { body } = await agent.get(`/rickandmorty/login${cadena}`);
            expect(body).toEqual({ access: true })

        })
        it('login Error', async () => {
            const cadena = '?email=diegolepore@gmail.com&password=987654'
            const { body } = await agent.get(`/rickandmorty/login${cadena}`);
            expect(body).toEqual({ access: false })

        })
    })
    describe('POST /rickandmorty/fav', () => {
        char1={id:1,name:'Rick'}
        char2={id:2,name:'Morty'}

        it('debe devolver un array', async () => {
            
            const response = await agent.post(`/rickandmorty/fav`).send(char1)
            
            expect(response.body).toBeInstanceOf(Array)

        })
        it('debe devolver el  array enviado ', async () => {
            const response = await agent.post(`/rickandmorty/fav`).send(char1)
            expect(response.body).toContainEqual(char1)

        })
        it('debe incluir el elemento anterior', async () => {
            
            const response = await agent.post(`/rickandmorty/fav`).send(char2)

            expect(response.body).toContainEqual(char1)
            expect(response.body).toContainEqual(char2)
        })
    })
    describe('DELETE /rickandmorty/fav/:id', () => {

        it('si no existe la ruta devolver el mismo array', async () => {
            
            const {body} = await agent.delete(`/rickandmorty/fav/77`)
            
            expect(body).toContainEqual(char1)
            expect(body).toContainEqual(char2)

        })
        it('si existe la ruta devolver el que quedo', async () => {
            
            const {body} = await agent.delete(`/rickandmorty/fav/1`)
            
            expect(body).not.toContainEqual(char1)
            expect(body).toContainEqual(char2)
        })
    })
})