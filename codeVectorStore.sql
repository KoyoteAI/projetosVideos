-- Cria a tabela embeddings com as colunas especificadas
CREATE TABLE embeddings (
    file_id UUID PRIMARY KEY,
    embedding VECTOR(1536),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice GIN para a coluna metadata JSONB, usado para consultas rápidas em metadados
CREATE INDEX embeddings_metadata_idx ON embeddings USING GIN (metadata);

-- Instala a extensão pgvector (caso ainda não esteja instalada)
CREATE EXTENSION IF NOT EXISTS vector;

-- Índice ivfflat para a coluna embedding, otimizado para buscas de similaridade em vetores
CREATE INDEX embeddings_embedding_idx 
ON embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
