#!/bin/bash
# Script de build para o Cloudflare Pages

echo "🚀 Iniciando build personalizado..."

# Instalar pnpm se não estiver disponível
if ! command -v pnpm &> /dev/null
then
    echo "📦 Instalando pnpm..."
    npm install -g pnpm
fi

# Instalar dependências
echo "📦 Instalando dependências..."
pnpm install

# Rodar o build do Vite
echo "🛠️ Rodando pnpm build..."
pnpm build

# Garantir que o diretório de saída exista e tenha os arquivos
if [ -d "dist" ]; then
    echo "✅ Build concluído com sucesso! Pasta 'dist' pronta."
    ls -F dist
else
    echo "❌ Erro: Pasta 'dist' não encontrada após o build."
    exit 1
fi
