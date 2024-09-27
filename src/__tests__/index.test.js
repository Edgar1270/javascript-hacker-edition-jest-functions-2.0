// src/index.test.js

const {
    updateStock,
    timeUntilOutOfStock,
    productNearOutOfStock,
    suggestRestockQuantity,
    simulateSales
} = require('./index');

describe('Gestão de Estoque', () => {
    let store;

    beforeEach(() => {
        store = [
            { nome: 'Produto A', preco: 10, quantidade: 100, vendaDiaria: 5, historicalSales: [] },
            { nome: 'Produto B', preco: 20, quantidade: 50, vendaDiaria: 3, historicalSales: [] },
            { nome: 'Produto C', preco: 30, quantidade: 20, vendaDiaria: 1, historicalSales: [] },
        ];
    });

    test('Atualiza o estoque corretamente', () => {
        updateStock(store[0], 20);
        expect(store[0].quantidade).toBe(120);
    });

    test('Calcula o tempo até o produto ficar sem estoque', () => {
        expect(timeUntilOutOfStock(store[0])).toBe(20);
        expect(timeUntilOutOfStock(store[2])).toBe(20);
    });

    test('Verifica o produto mais próximo de ficar sem estoque', () => {
        const produtoMaisProximo = productNearOutOfStock(store);
        expect(produtoMaisProximo.nome).toBe('Produto C');
    });

    test('Sugere a quantidade de reabastecimento', () => {
        store[0].historicalSales = [5, 5, 5, 5, 5]; // 5 vendas por dia
        const suggestedQuantity = suggestRestockQuantity(store[0], store[0].historicalSales);
        expect(suggestedQuantity).toBe(25); // 5 dias de vendas (5 * 5)
    });

    test('Simula vendas e atualiza o estoque', () => {
        simulateSales(store);
        expect(store[0].quantidade).toBeLessThan(100);
        expect(store[1].quantidade).toBeLessThan(50);
        expect(store[2].quantidade).toBeLessThan(20);
    });
});
