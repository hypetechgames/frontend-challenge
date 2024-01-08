import dotenv from 'dotenv'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()
const app = express();
const PORT = process.env.PORT; // Usa a variável de ambiente PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Serve os arquivos estáticos do diretório 'dist'
app.use(express.static(join(__dirname, 'dist')));

// Para todas as outras rotas, redirecione para o index.html
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});