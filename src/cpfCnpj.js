!function( ng ) {
    "use strict";

    var module = ng.module( "brazilfields.cpfCnpj", [
        "brazilfields.utils"
    ]);

    // Dinamicamente gera as diretivas
    [ "cpf", "cnpj" ].forEach(function( type ) {
        var name = "br" + type[ 0 ].toUpperCase() + type.substr( 1 );

        module.directive( name, [ "brValidate", function( brValidate ) {
            var definition = {};

            definition.priority = 500;
            definition.require = "ngModel";
            definition.link = function( scope, element, attrs, ngModel ) {
                var validator = function( value ) {
                    var valid;
                    var attr = element.attr( attrs.$attr[ name ] );

                    // Deve validar quando o atributo não tem valor ou o seu valor (como uma
                    // expressão do Angular) retorna um valor truthy
                    // Também é levado em conta se há um valor na directive ngModel
                    var mustValidate = ( attr || "" ).trim() ? !!scope.$eval( attr ) : true;
                    mustValidate &= !!( value || "" ).trim();

                    if ( mustValidate ) {
                        // Roda o algoritmo de validação
                        valid = brValidate[ type ]( value );
                    } else {
                        // Se não é pra validar, seta como válido apenas.
                        valid = true;
                    }

                    ngModel.$setValidity( type, valid );
                    return valid ? value : undefined;
                };

                // Adiciona as funções de validação dos 2 lados
                ngModel.$parsers.push( validator );
                ngModel.$formatters.push( validator );
            };

            return definition;
        }]);
    });

}( angular );