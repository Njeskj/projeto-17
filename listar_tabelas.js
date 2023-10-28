document.addEventListener('DOMContentLoaded', function() {
    const mostrarTabelasBtn = document.getElementById('mostrarTabelasBtn');
    const listaTabelasDiv = document.getElementById('listaTabelas');
  
    mostrarTabelasBtn.addEventListener('click', function() {
      carregarEExibirTabelas('tabelas.txt'); // Substitua pelo nome do seu arquivo .txt
    });
  
    function carregarEExibirTabelas(arquivoTXT) {
      fs.readFile(arquivoTXT, 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return;
        }
  
        const linhas = data.split('\n');
        let contadorTabelas = 0;
  
        listaTabelasDiv.innerHTML = ''; // Limpa o conteúdo anterior
  
        linhas.forEach((linha, index) => {
          if (linha.includes('CREATE TABLE')) {
            contadorTabelas++;
            const linhaElement = document.createElement('p');
            linhaElement.textContent = `${contadorTabelas} - Linha ${index + 1}: ${linha}`;
            listaTabelasDiv.appendChild(linhaElement);
          }
        });
  
        if (contadorTabelas === 0) {
          listaTabelasDiv.textContent = 'Nenhuma tabela "CREATE TABLE" encontrada no arquivo.';
        }
      });
    }
  });
  