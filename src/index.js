// src/index.js

// Função para criar um produto
function criarProduto(nome, preco, quantidade, vendaDiaria) {
    return {
        nome,
        preco,
        quantidade,
        vendaDiaria,
        historicalSales: [] // Para armazenar o histórico de vendas
    };
}

// Função para vender produtos por um dia e atualizar o estoque
function venderDia(produto) {
    const vendasHoje = Math.min(produto.quantidade, produto.vendaDiaria);
    produto.quantidade -= vendasHoje;
    produto.historicalSales.push(vendasHoje);
}

// Função para calcular quantos dias até o estoque zerar
function diasAteEstoqueZerado(produto) {
    if (produto.vendaDiaria === 0) return Infinity; // Nunca ficará sem estoque
    return Math.floor(produto.quantidade / produto.vendaDiaria);
}

// Função para adicionar um produto à loja
function adicionarProdutoNaLoja(loja, produto) {
    loja.push(produto);
}

// Função para verificar qual produto está mais próximo de esgotar o estoque
function produtoMaisProximoDeEsgotar(loja) {
    return loja.reduce((prev, current) => {
        const prevDias = diasAteEstoqueZerado(prev);
        const currentDias = diasAteEstoqueZerado(current);
        return (currentDias < prevDias) ? current : prev;
    });
}

// Função para sugerir uma quantidade de reabastecimento com base no histórico de vendas
function sugerirReabastecimento(produto) {
    const totalVendas = produto.historicalSales.reduce((a, b) => a + b, 0);
    const diasVendas = produto.historicalSales.length;
    const mediaVendas = diasVendas ? (totalVendas / diasVendas) : 0; // Previne divisão por zero
    return Math.ceil(mediaVendas * 5); // Sugere reabastecer com base em 5 dias de vendas
}

// Função para simular vendas por 30 dias
function simularVendasPor30Dias(produto) {
    for (let dia = 0; dia < 30; dia++) {
        venderDia(produto);
    }
}

// Função para simular as vendas para todos os produtos da loja
function simularVendasNaLoja(loja) {
    loja.forEach(produto => {
        simularVendasPor30Dias(produto);
    });
}

// Exemplo de uso
const loja = [];

// Adicionando produtos
adicionarProdutoNaLoja(loja, criarProduto('Produto A', 10, 100, 5));
adicionarProdutoNaLoja(loja, criarProduto('Produto B', 20, 50, 3));
adicionarProdutoNaLoja(loja, criarProduto('Produto C', 30, 20, 1));

// Simulando vendas
simularVendasNaLoja(loja);

// Verificando produto mais próximo de esgotar
const produtoEsgotando = produtoMaisProximoDeEsgotar(loja);
console.log(`Produto mais próximo de esgotar: ${produtoEsgotando.nome}`);

// Sugerindo reabastecimento
const quantidadeReabastecimento = sugerirReabastecimento(produtoEsgotando);
console.log(`Quantidade sugerida para reabastecimento: ${quantidadeReabastecimento}`);

module.exports = {
    criarProduto,
    venderDia,
    diasAteEstoqueZerado,
    adicionarProdutoNaLoja,
    produtoMaisProximoDeEsgotar,
    sugerirReabastecimento,
    simularVendasNaLoja,
};
