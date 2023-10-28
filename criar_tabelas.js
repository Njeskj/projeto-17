// const fs = require('fs');
// const path = require('path');

// function criarArquivosSQLDeArquivoTXT(arquivoTXT) {
//   // Lê o conteúdo do arquivo TXT
//   fs.readFile(arquivoTXT, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo TXT:', err);
//       return;
//     }

//     // Divide o conteúdo em comandos SQL
//     const comandosSQL = data.split(';\n');

//     // Cria a pasta "SQL" se ela não existir
//     const pastaSQL = path.join(__dirname, 'SQL');
//     if (!fs.existsSync(pastaSQL)) {
//       fs.mkdirSync(pastaSQL);
//     }

//     // Loop através dos comandos SQL para identificar "CREATE TABLE"
//     comandosSQL.forEach((comando) => {
//       if (comando.trim().startsWith('CREATE TABLE')) {
//         // Extrai o nome da tabela
//         const matches = comando.match(/CREATE TABLE ([^\s]+)/);
//         if (matches && matches[1]) {
//           const nomeTabela = matches[1];
//           const arquivoSQL = path.join(pastaSQL, `${nomeTabela}.sql`);
          
//           // Escreve o comando SQL em um arquivo separado
//           fs.writeFile(arquivoSQL, comando, 'utf8', (err) => {
//             if (err) {
//               console.error(`Erro ao criar o arquivo SQL para a tabela ${nomeTabela}:`, err);
//             } else {
//               console.log(`Arquivo SQL para a tabela ${nomeTabela} criado com sucesso: ${arquivoSQL}`);
//             }
//           });
//         }
//       }
//     });
//   });
// }

// Exemplo de uso:
const arquivoTXT = 'tabelas.txt';
criarArquivosSQLDeArquivoTXT(arquivoTXT);


document.getElementById('executarScript').addEventListener('click', function() {
    const arquivoTXT = document.getElementById('arquivoTXT').files[0];
    if (!arquivoTXT) {
        alert('Por favor, selecione um arquivo TXT.');
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(evento) {
        const conteudo = evento.target.result;
        const script = `
            ${conteudo}

            const fs = require('fs');
const path = require('path');

function criarArquivosSQLDeArquivoTXT(arquivoTXT) {
  // Lê o conteúdo do arquivo TXT
  fs.readFile(arquivoTXT, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo TXT:', err);
      return;
    }

    // Divide o conteúdo em comandos SQL
    const comandosSQL = data.split(';\n');

    // Cria a pasta "SQL" se ela não existir
    const pastaSQL = path.join(__dirname, 'SQL');
    if (!fs.existsSync(pastaSQL)) {
      fs.mkdirSync(pastaSQL);
    }

    // Loop através dos comandos SQL para identificar "CREATE TABLE"
    comandosSQL.forEach((comando) => {
      if (comando.trim().startsWith('CREATE TABLE')) {
        // Extrai o nome da tabela
        const matches = comando.match(/CREATE TABLE ([^\s]+)/);
        if (matches && matches[1]) {
          const nomeTabela = matches[1];
          const arquivoSQL = path.join(pastaSQL, `${nomeTabela}.sql`);
          
          // Escreve o comando SQL em um arquivo separado
          fs.writeFile(arquivoSQL, comando, 'utf8', (err) => {
            if (err) {
              console.error(`Erro ao criar o arquivo SQL para a tabela ${nomeTabela}:`, err);
            } else {
              console.log(`Arquivo SQL para a tabela ${nomeTabela} criado com sucesso: ${arquivoSQL}`);
            }
          });
        }
      }
    });
  });
}
        `;

        // Cria um elemento <script> e insere o código dentro dele
        const scriptElement = document.createElement('script');
        scriptElement.textContent = script;

        // Adiciona o <script> ao <body> para que seja executado
        document.body.appendChild(scriptElement);
    };

    leitor.readAsText(arquivoTXT);
});