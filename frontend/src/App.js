import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function App() {
  const [alunos, setAlunos] = useState([]);

  const [nome, setNome] = useState("");

  const [notas, setNotas] = useState(["", "", "", "", ""]);

  const [presencas, setPresencas] = useState(["", "", "", "", ""]);

  const [mediaGeralTurma, setMediaGeralTurma] = useState(0);
  const [mediaTurmaNotas, setMediaTurmaNotas] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (alunos.length > 0) {
      axios.get("http://localhost:5000/media-geral").then((res) => {
        setMediaGeralTurma(parseFloat(res.data.mediaGeral));
      });

      axios.get("http://localhost:5000/media-por-disciplina").then((res) => {
        setMediaTurmaNotas(res.data.medias.map(Number));
      });
    }
  }, [alunos]);

  function carregarDados() {
    axios
      .get("http://localhost:5000/alunos")
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar alunos:", error);
      });
  }

  function adicionarAluno(e) {
    e.preventDefault();

    const novoAluno = {
      nome: nome,
      notas: notas.map(Number),
      presencas: presencas.map(Number),
    };

    axios
      .post("http://localhost:5000/alunos", novoAluno)
      .then(() => {
        carregarDados();
        limparFormulario();
      })
      .catch((error) => {
        console.error("Erro ao adicionar aluno:", error);
        alert("Erro ao adicionar aluno. Tente novamente.");
      });
  }

  function limparFormulario() {
    setNome("");
    setNotas(["", "", "", "", ""]);
    setPresencas(["", "", "", "", ""]);
  }

  const linhasTabela = [];
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    const frequenciaBaixa = aluno.frequencia < 75;

    linhasTabela.push(
      <tr
        key={i}
        style={{
          backgroundColor: frequenciaBaixa ? "lightcoral" : "white",
        }}
      >
        <td>{aluno.nome.toUpperCase()}</td>
        <td>{aluno.notas[0]}</td>
        <td>{aluno.notas[1]}</td>
        <td>{aluno.notas[2]}</td>
        <td>{aluno.notas[3]}</td>
        <td>{aluno.notas[4]}</td>
        <td>{aluno.frequencia}%</td>
        <td>{aluno.media}</td>
        <td>{frequenciaBaixa ? "Baixa frequência" : "—"}</td>
      </tr>
    );
  }

  const listaMedias = [];
  for (let i = 0; i < mediaTurmaNotas.length; i++) {
    listaMedias.push(
      <li key={i}>
        Disciplina {i + 1}: {mediaTurmaNotas[i].toFixed(2)}
      </li>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Controle de Notas - Professor Carlos</h1>

      <form className="formulario" onSubmit={adicionarAluno}>
        <div className="form-container">
          <input
            className="input-texto"
            type="text"
            placeholder="Nome do Aluno(a)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          ></input>
        </div>

        <div className="form-frequencias">
          <div className="coluna">
            {notas.map((nota, i) => (
              <input
                key={i}
                className="input-nota"
                type="number"
                placeholder={`Nota Disciplina ${i + 1}`}
                min="0"
                max="10"
                step="0.01"
                value={nota}
                onChange={(e) =>
                  setNotas(
                    notas.map((n, index) =>
                      index === i ? parseFloat(e.target.value) : n
                    )
                  )
                }
              ></input>
            ))}
          </div>

          <div className="coluna">
            {presencas.map((presenca, i) => (
              <input
                key={i}
                className="input-frequencia"
                type="number"
                placeholder={`Frequência Disciplina ${i + 1} (%)`}
                min="0"
                max="100"
                step="0.01"
                value={presenca}
                onChange={(e) =>
                  setPresencas(
                    presencas.map((n, index) =>
                      index === i ? parseFloat(e.target.value) : n
                    )
                  )
                }
              ></input>
            ))}
          </div>
        </div>

        <button className="botao" type="submit">
          Adicionar Aluno
        </button>
      </form>

      <h2 className="subtitulo">Lista de Alunos</h2>
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Disciplina 1</th>
            <th>Disciplina 2</th>
            <th>Disciplina 3</th>
            <th>Disciplina 4</th>
            <th>Disciplina 5</th>
            <th>Frequência Média (%)</th>
            <th>Média</th>
            <th>Situação</th>
          </tr>
        </thead>

        <tbody>{linhasTabela}</tbody>
      </table>

      <div className="colunas-wrapper">
        <div className="coluna">
          <h3>Média Geral da Turma: {mediaGeralTurma}</h3>
          <ul>{listaMedias}</ul>
        </div>

        <div className="coluna">
          <h3>Alunos com nota acima da média em pelo menos uma disciplina:</h3>
          <ul>
            {alunos
              .filter((aluno) =>
                aluno.notas.some((n, i) => n > mediaTurmaNotas[i])
              )
              .map((aluno, i) => (
                <li key={i}>{aluno.nome.toUpperCase()}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
