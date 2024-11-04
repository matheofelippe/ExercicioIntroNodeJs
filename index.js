const express = require('express');
const app = express();
const { randomUUID } = require('crypto');
app.use(express.json());
app.listen(3000, () => console.log('Servidor rodando na porta: 3000'));

const pessoas = [
    { id: randomUUID(), nome: 'Felippe', celular: '147258369' },
    { id: randomUUID(), nome: 'Eduardo', celular: '963852741' },
    { id: randomUUID(), nome: 'Cristina', celular: '987654321' }
];

////GET////
app.get("/pessoas", (request, response) => {
    return response.json(pessoas);
});

////POST////
app.post("/pessoas", (request, response) => {
    const { nome, celular } = request.body;

    const pessoa = {
        id: randomUUID(),
        'nome': nome,
        'celular': celular
    }
    pessoas.push(pessoa);
    return response.status(201).json(pessoa); // Adiciona resposta para o cliente
})

//// PUT ////
app.put("/pessoas/:id", (request, response) => {
    const { id } = request.params;
    const { nome, celular } = request.body;

    const index = pessoas.findIndex(pessoa => pessoa.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Pessoa não encontrada" });
    }

    pessoas[index] = {
        ...pessoas[index],
        nome: nome || pessoas[index].nome,
        celular: celular || pessoas[index].celular
    };

    return response.json(pessoas[index]);
});


//// DELETE ////
app.delete("/pessoas/:id", (request, response) => {
    const { id } = request.params;

    const index = pessoas.findIndex(pessoa => pessoa.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Pessoa não encontrada" });
    }

    pessoas.splice(index, 1);

    return response.status(200).json({ message: "Pessoa excluída com sucesso" });
});