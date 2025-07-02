📋 Lista de Tarefas - React Native

Este é um aplicativo de lista de tarefas (to-do list) desenvolvido em React Native com expo, o app permite que usuários autenticados crie, visualizar, filtrar, concluir e excluir tarefas, com persistência local utilizando AsyncStorage e SecureStore. A autenticação é feita via OAuth2 usando a biblioteca expo-auth-session,

📦 Instalação e Execução

Certifique-se de que você tem o **Node.js**, o **Expo CLI** e o **Git** instalados na sua máquina.  
Caso não tenha, é necessário instalá-los antes de continuar.

🔧 Passos para rodar o projeto localmente
 
* Clone o repositório:

  git clone https://github.com/rbrozinga/app-interfocus.git

* Acesse o diretório do projeto:

 cd app-interfocus

* Instale as dependências:

 npm install

* Inicie o projeto:

 npx expo start  

📱 No celular

1. Instale o app Expo Go no seu dispositivo:
    * Google Play
    * Apple Store
2. Com o Expo Go instalado, execute o comando abaixo no terminal (se ainda não executou): npx expo start
3. Um QR Code será exibido no terminal ou no navegador. 
4. Para abrir no celular:
    * Android: Abra o app Expo Go e use a opção de escanear QR Code.
    * iPhone: Use a câmera do iPhone para escanear o QR Code. Isso abrirá o app automaticamente no Expo Go (não precisa instalar nada adicional).

⚠️ Você não precisa instalar o app no celular via .apk ou App Store manualmente. O Expo Go já é suficiente para rodar o app diretamente durante o desenvolvimento.    


✨ Funcionalidades
* Autenticação OAuth2
* Criação de novas tarefas
* Visualização de detalhes da tarefa
* Filtro por status: Abertas, Concluídas ou Todas
* Concluir e excluir múltiplas tarefas
* Persistência de dados por usuário (armazenamento local)
* Logout com limpeza de dados 
 
📱 Telas do Aplicativo
* Login: autenticação via OAuth.
* Lista de Tarefas: visualização, filtragem, seleção e ações em tarefas.
* Criar Tarefa: modal para adicionar nova tarefa.
* Detalhes da Tarefa: modal de leitura de conteúdo.   

🧪 Tecnologias Utilizadas

As bibliotecas e ferramentas listadas abaixo foram escolhidas por serem modernas, bastante utilizada pela comunidade e por oferecerem uma melhor curva de aprendizado. Além disso, optei por tecnologias que já tenho familiaridade, o que permitiu maior produtividade e clareza no desenvolvimento, como o uso de Expo e StyleSheet para estilização nativa. 
* React Native – Framework principal para desenvolvimento mobile multiplataforma.
* TypeScript – Tipagem estática para maior segurança e legibilidade do código.
* Expo – Facilitador no desenvolvimento, build e debugging de apps React Native.
* React Navigation – Biblioteca padrão para navegação entre telas no React Native.
* AsyncStorage – Armazenamento local simples para dados persistentes do usuário.
* SecureStore – Armazenamento seguro de dados sensíveis, como tokens de autenticação.
* uuid – Geração de identificadores únicos para cada tarefa.
* dayjs – Manipulação e formatação de datas de forma leve e eficiente.
* expo-auth-session – Implementação de fluxo de autenticação OAuth2 com suporte a redirect seguro.
* StyleSheet – API nativa do React Native para estilização de componentes com performance otimizada.

🔐 Autenticação

* A autenticação é realizada via OAuth2 usando expo-auth-session.
* O token de acesso é armazenado com expo-secure-store e utilizado para identificar o usuário no armazenamento local.

💾 Armazenamento de Dados
* As tarefas são armazenadas com @react-native-async-storage/async-storage.
* Cada usuário tem sua chave de armazenamento exclusiva baseada no token obtido.  

🏗️ Arquitetura do Aplicativo  Este aplicativo foi desenvolvido utilizando a arquitetura MVC, organizada da seguinte forma:

* Model (Modelo): Representado pelo tipo Task e pela persistência local dos dados utilizando AsyncStorage para armazenar as tarefas e SecureStore para armazenar o token do usuário com segurança. 
* View : Componentes React responsáveis pela interface do usuário, como os modais (CreateTaskModal, TaskDetailModal), cartões de tarefa (TaskCard), filtros (TaskFilters), botões de ação (TaskActions) e cabeçalho (Header). Eles exibem dados e capturam eventos do usuário. 
* Controller: As telas principais (TasksScreen e LoginScreen) que gerenciam o estado da aplicação, manipulam a lógica de negócio, interagem com os modelos e atualizam as views com base nas ações do usuário.
* Essa abordagem promove uma separação clara entre a interface, os dados e a lógica, facilitando a manutenção e evolução do projeto. 
