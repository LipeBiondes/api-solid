# api-solid

Criando api SOLID - curso node - Rocketseat

# APP

Gympass style app.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo um usuário logado;
- [ ] Deve ser possivel o usuario obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] O usuário não pode se cadastrar com o mesmo email;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer login se não estiver 100m proximo a uma academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam ser persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisame estar paginadas com 20 itens por página;
- [ ] O usuario deve ser indentificado por um token JWT (JSON Web Token); ;
