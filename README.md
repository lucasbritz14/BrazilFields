# BrazilFields [![Build Status](http://img.shields.io/travis/gustavohenke/BrazilFields.svg?style=flat-square)](https://travis-ci.org/gustavohenke/BrazilFields)
Conjunto de utilidades Angular.js para documentos brasileiros.

## Instalação

* __Via Git:__  
  ```shell
  git clone git@github.com:gustavohenke/BrazilFields.git
  ```

* __Via Bower:__  
  ```shell
  bower install brazilfields --save
  ```

* __Via NPM:__  
  ```shell
  npm install brazilfields --save
  ```

* __Via download:__  
  Download: [https://github.com/gustavohenke/BrazilFields/archive/master.zip](https://github.com/gustavohenke/BrazilFields/archive/master.zip).

Depois, basta incluir o script `dist/brazilfields.js` em sua página.

## Utilização
Primeiramente, injete o módulo `brazilfields` no seu app Angular:

```javascript
var app = angular.module( "app", [ "brazilfields" ] );
```

### Validações
É possível realizar validações de CPFs, CNPJs e estados brasileiros usando o service `brValidate`:

```javascript
app.controller( "MeuController", [ "$scope", "brValidate", function( $scope, brValidate ) {
    brValidate.cpf( "20620614803" );
    // => true
    
    brValidate.cpf( "206.206.148-03" );
    // => true, pontuações . e - são permitidas
    
    brValidate.cpf( "   206206.148-03 " );
    // => true, esquecer-se da pontuação padrão ou espaços ao redor são permitidos
    
    brValidate.cpf( "206.206.148-13" );
    // => false, dígito verificador inválido!
    
    // -----
    
    brValidate.cnpj( "06439677000107" );
    // => true
    
    brValidate.cnpj( "06.439.677/0001-07" );
    // => true, pontuações ., / e - são permitidas
    
    brValidate.cnpj( " 06.4396770001-07   " );
    // => true, esquecer-se da pontuação padrão ou espaços ao redor são permitidos
    
    brValidate.cnpj( "06.439.677/0001-08" );
    // => false, dígito verificador inválido!
    
    // -----
    
    brValidate.state( "RS" ); // => true
    brValidate.state( "sp" ); // => true, case insensitive
    brValidate.state( "XX" ); // => false, estado não existe
    brValidate.state( "Sao Paulo" ); // => true, busca por nome do estado sem considerar acentuação
    brValidate.state( "Foobar" ); // => false, estado inexistente
}]);
```

### Diretivas

#### br-cpf
Valida um campo de CPF com `ng-model` e define a chave de validação `cpf` quando o mesmo estiver inválido.

Exemplo:

```html
<form name="form">
  <input type="text" name="cpf" ng-model="cpf" br-cpf>
  <p ng-show="form.cpf.$error.cpf">Digite um CPF válido!</p>
</form>
```

#### br-cnpj
Valida um campo de CNPJ com `ng-model` e define a chave de validação `cnpj` quando o mesmo estiver inválido.

Exemplo:

```html
<form name="form">
  <input type="text" name="cnpj" ng-model="cnpj" br-cnpj>
  <p ng-show="form.cnpj.$error.cnpj">Digite um CNPJ válido!</p>
</form>
```

## Licença
MIT &copy; Gustavo Henke
