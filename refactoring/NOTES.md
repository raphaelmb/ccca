## Tests should be FIRST:

Fast
Independent
Repeatable
Self-validating
Timely

## Code smells

- nomes estranhos

dist, ds, calc, movArray, mov, result

renomear variáveis
renomear métodos
renomear classes
renomear arquivos
renomear pastas
etc

- números mágicos

  3.90, 2.90, 2.1, 0, 10, -1, -2, 22, 6

extrair constantes
extrair variáveis explicativas

- comentários

renomear
extrair método
extrair variável explicativa

- código morto

apagar

- linhas em branco

remover linhas em branco

- condições confusas

extrair condição
remover condições aninhadas por cláusulas guarda
consolidar condições
introduzir ternário

- falta de tratamento de exceptions

substituir código de erro por exception
incorporar informações de tratamento

- método longo

- "classe grande"

- quebrando o OCP (Open/Closed Principle)

- inveja de dados

mover métodos
ocultar delegações

- longa lista de parâmetros

quanto menos parâmetros melhor

introduzir abstrações
introduzir objetos parâmetro
