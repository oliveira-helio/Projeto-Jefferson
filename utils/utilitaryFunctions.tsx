const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

//  TODO colocar handleQtyIncreaser e handleQtyDecrease aqui para usar no quantity selector em mais de um lugar

export { formatCurrency };
