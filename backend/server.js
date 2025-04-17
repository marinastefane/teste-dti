const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

let alunos = [];

app.post("/alunos", (req, res) => {
  const { nome, notas, presencas } = req.body;

  if (
    !nome ||
    !notas ||
    !presencas ||
    notas.length !== 5 ||
    presencas.length !== 5
  ) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos corretamente!",
    });
  }

  //calculo da media
  let somaNotas = 0;
  for (let i = 0; i < notas.length; i++) {
    somaNotas += parseFloat(notas[i]);
  }

  //media individual das notas do aluno
  const media = somaNotas / notas.length;

  let somaPresenca = 0;
  for (let i = 0; i < presencas.length; i++) {
    somaPresenca += parseFloat(presencas[i]);
  }

  //media individual da frequencia do aluno
  const frequencia = (somaPresenca / presencas.length).toFixed(2);

  const novoAluno = {
    nome,
    notas,
    frequencia,
    media: media.toFixed(2),
  };

  alunos.push(novoAluno);

  res.status(201).json({ mensagem: "Aluno adicionado com sucesso!" });
});

//rota para buscar todos os alunos (GET)
app.get("/alunos", (req, res) => {
  res.json(alunos);
});

app.get("/media-geral", (req, res) => {
  if (alunos.length == 0) {
    return res.json({ mediaGeral: 0 });
  }

  //calculo da media
  let somaGeral = 0;

  for (let i = 0; i < alunos.length; i++) {
    somaGeral += parseFloat(alunos[i].media);
  }
  const mediaGeral = somaGeral / alunos.length;

  res.json({ mediaGeral: mediaGeral.toFixed(2) });
});

// Média da turma por disciplina
app.get("/media-por-disciplina", (req, res) => {
  if (alunos.length === 0) {
    return res.json({ medias: [] });
  }

  const somaTotalNotas = [0, 0, 0, 0, 0];
  const mediaTurmaNotas = [0, 0, 0, 0, 0];

  // percorre o array de alunos
  for (let i = 0; i < alunos.length; i++) {
    let aluno = alunos[i]; //pega o aluno atual

    //percorre as 5 notas do atual aluno
    for (let j = 0; j < 5; j++) {
      somaTotalNotas[j] += aluno.notas[j];
    }
  }

  for (let k = 0; k < 5; k++) {
    mediaTurmaNotas[k] = somaTotalNotas[k] / alunos.length;
  }

  res.json({ medias: mediaTurmaNotas.map((m) => m.toFixed(2)) });
});

app.get("/", (req, res) => {
  res.send("Welcome to DTI-test");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
