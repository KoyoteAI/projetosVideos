function chunkTextWithOverlap(text, chunkSize, overlapSize) {
  if (!text || typeof text !== 'string') throw new Error("O campo 'texto' está ausente ou não é uma string."); // Verifica se `text` existe e é uma string

  const words = text.split(/\s+/); // Divide o texto em palavras, usando qualquer espaço como delimitador
  const chunks = []; // Inicializa um array vazio para armazenar os chunks
  let id = 1; // Define um contador de ID para cada chunk

  for (let i = 0; i < words.length; i += (chunkSize - overlapSize)) { // Itera sobre as palavras com uma sobreposição
    const chunk = words.slice(i, i + chunkSize).join(" "); // Cria um chunk, combinando `chunkSize` palavras a partir do índice `i`
    chunks.push({ json: { id, chunk } }); // Adiciona o chunk como um objeto com `id` e `chunk` no array `chunks`
    id++; // Incrementa o ID para o próximo chunk
  }

  return chunks; // Retorna o array de chunks formatado
}

const text = $json["texto"]; // Acessa o campo `texto` do dado de entrada no n8n

const chunkSize = 500; // Define o número máximo de palavras em cada chunk
const overlapSize = 50; // Define a sobreposição de palavras entre os chunks

return chunkTextWithOverlap(text, chunkSize, overlapSize); // Executa a função e retorna o array de chunks no formato esperado pelo n8n
