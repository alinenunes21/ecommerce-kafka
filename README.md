# 🛒 E-commerce Pro - Sistema de Mensageria

Sistema distribuído de e-commerce desenvolvido com **Java Spring Boot**, **Angular** e **Apache Kafka** para processamento de eventos em tempo real.

## 👥 Integrantes do Grupo

- **[ALINE NUNES DOS SANTOS RIBEIRO]** -MATRICULA - 202206141

---

## 🏗️ Arquitetura do Sistema

### Visão Geral
```
┌─────────────────┐    orders    ┌─────────────────┐    inventory-events    ┌─────────────────┐
│   Order Service │ ──────────► │ Inventory Service│ ────────────────────► │Notification Svc │
│    (Port 8081)  │             │    (Port 8082)   │                       │   (Port 8083)   │
└─────────────────┘             └─────────────────┘                       └─────────────────┘
        │                                │                                          │
        │                                │                                          │
        ▼                                ▼                                          ▼
   PostgreSQL                     Verifica Estoque                            Envia Notificações
   (Pedidos)                      Atualiza BD                                Email/SMS Simulado
```

### Frontend
```
┌─────────────────┐
│ Angular Frontend│ ──── HTTP ────► Order Service
│   (Port 4200)   │
└─────────────────┘
```

---

## 🔧 Tecnologias Utilizadas

### Backend
- **Java 21** - Linguagem principal
- **Spring Boot 3.2.0** - Framework web
- **Spring Data JPA** - Persistência de dados
- **Apache Kafka** - Sistema de mensageria
- **PostgreSQL** - Banco de dados
- **Maven** - Gerenciamento de dependências

### Frontend
- **Angular 18** - Framework frontend
- **TypeScript** - Linguagem principal
- **Reactive Forms** - Gerenciamento de formulários
- **HttpClient** - Comunicação com APIs

### Infraestrutura
- **Docker Compose** - Orquestração do Kafka
- **Kafka UI** - Interface de monitoramento

---

## 📦 Estrutura do Projeto

```
ecommerce-kafka/
├── order-service/                  # Microserviço de Pedidos
│   ├── src/main/java/com/ecommerce/order/
│   │   ├── Order.java              # Entidade JPA
│   │   ├── OrderItem.java          # Entidade JPA
│   │   ├── OrderRepository.java    # Repositório
│   │   ├── OrderService.java       # Lógica de negócio
│   │   ├── OrderController.java    # REST Controller
│   │   └── KafkaConfig.java        # Configuração Kafka
│   └── src/main/resources/
│       └── application.properties  # Configurações
├── inventory-service/               # Microserviço de Estoque
├── notification-service/            # Microserviço de Notificação
├── frontend-angular/                # Frontend Angular
│   ├── src/app/
│   │   ├── models/                 # Interfaces TypeScript
│   │   ├── services/               # Serviços HTTP
│   │   └── components/             # Componentes Angular
├── docker-compose.yml              # Configuração Kafka
└── README.md                       # Este arquivo
```

---

## 🚀 Como Executar

### Pré-requisitos
- **Java 17+**
- **Maven 3.6+**
- **Node.js 18+**
- **Docker & Docker Compose**
- **PostgreSQL** rodando na porta 5432

### 1. Configurar Banco de Dados
```sql
-- Conectar no PostgreSQL e criar o banco
CREATE DATABASE postgres;
-- Usar usuário: postgres, senha: 123456
```

### 2. Iniciar Kafka
```bash
cd ecommerce-kafka/
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

### 3. Criar Tópicos do Kafka
```bash
# Tópico de pedidos
docker exec kafka kafka-topics --create \
  --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1

# Tópico de eventos de estoque
docker exec kafka kafka-topics --create \
  --topic inventory-events \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1
```

### 4. Executar Microserviços Backend

#### Order Service (Terminal 1)
```bash
cd order-service/
mvn spring-boot:run
# Disponível em: http://localhost:8081
```

#### Inventory Service (Terminal 2)
```bash
cd inventory-service/
mvn spring-boot:run
# Disponível em: http://localhost:8082
```

#### Notification Service (Terminal 3)
```bash
cd notification-service/
mvn spring-boot:run
# Disponível em: http://localhost:8083
```

### 5. Executar Frontend Angular
```bash
cd frontend-angular/
npm install
ng serve
# Disponível em: http://localhost:4200
```

### 6. Acessar Aplicação
- **Frontend**: http://localhost:4200
- **Kafka UI**: http://localhost:8080
- **APIs**: 
  - Order Service: http://localhost:8081
  - Inventory Service: http://localhost:8082

---

## 🧪 Testando o Sistema

### 1. Teste via Interface Web
1. Acesse http://localhost:4200
2. Preencha o formulário de pedido
3. Clique em "Finalizar Pedido"
4. Observe as mensagens nos logs dos serviços

### 2. Teste via API REST
```bash
curl -X POST http://localhost:8081/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productName": "Smartphone Galaxy S24",
        "quantity": 1,
        "price": 2999.99
      }
    ]
  }'
```

### 3. Monitoramento
- **Kafka UI**: http://localhost:8080 - Visualizar mensagens nos tópicos
- **Logs**: Acompanhar processamento nos terminais dos serviços
- **Banco**: Verificar dados salvos no PostgreSQL

---

## 📊 Requisitos Não-Funcionais

### 1. Escalabilidade
**Como conseguir escalabilidade com Apache Kafka:**

- **Particionamento**: Tópicos configurados com 3 partições permitem processamento paralelo
- **Consumer Groups**: Cada serviço usa group-id único para balanceamento automático
- **Múltiplas Instâncias**: Podem ser iniciadas na mesma consumer group
- **Distribuição de Carga**: Kafka redistribui partições automaticamente

**Implementação:**
```bash
# Múltiplas instâncias do mesmo serviço
java -jar inventory-service.jar --server.port=8082
java -jar inventory-service.jar --server.port=8084  # Segunda instância
```

### 2. Tolerância à Falha
**Definição**: Capacidade do sistema continuar operando mesmo quando componentes falham.

**Exemplo de Falha**: Inventory Service para por 30 minutos.

**Como o Kafka trata:**
1. **Mensagens persistem**: Pedidos ficam no tópico `orders`
2. **Offset não avança**: Consumer group para de processar
3. **Recuperação automática**: Quando serviço volta, processa mensagens pendentes
4. **Retenção configurável**: Mensagens ficam 7 dias no broker

**Implementação:**
```properties
# application.properties
spring.kafka.consumer.enable-auto-commit=true
spring.kafka.consumer.auto-commit-interval=1000
spring.kafka.consumer.auto-offset-reset=earliest
```

### 3. Idempotência
**Definição**: Processar a mesma mensagem múltiplas vezes produz o mesmo resultado.

**Como garantimos:**
1. **UUIDs únicos**: Cada pedido tem ID único gerado uma vez
2. **Chaves de mensagem**: Usamos order-id como chave no Kafka
3. **Verificação de estado**: Operações verificam antes de executar
4. **Operações atômicas**: Atualizações de estoque são sincronizadas

**Implementação:**
```java
// Exemplo no OrderService
kafkaTemplate.send(TOPIC_NAME, order.getId(), orderJson);
//                              ↑ Chave única para ordem

// Exemplo no InventoryService
public synchronized boolean reserveStock(String product, int quantity) {
    // Operação atômica protegida
}
```

---

## 🔄 Fluxo Completo do Sistema

1. **Usuário** cria pedido na interface Angular
2. **Order Service** recebe requisição HTTP
3. **Order Service** salva no PostgreSQL e publica no tópico `orders`
4. **Inventory Service** consome mensagem, verifica estoque
5. **Inventory Service** publica resultado no tópico `inventory-events`
6. **Notification Service** consome evento e simula notificação
7. **Frontend** recebe confirmação e exibe para usuário

---

## 📈 Funcionalidades Implementadas

### ✅ Requisitos Funcionais
- **RF-1**: Tópicos `orders` e `inventory-events` criados via kafka-topics.sh
- **RF-2**: Order Service com REST API (POST /orders) gerando UUID e timestamp
- **RF-3**: Inventory Service processa mensagens em ordem e publica resultado
- **RF-4**: Notification Service registra notificações no console

### ✅ Recursos Adicionais
- **Interface Web**: Frontend Angular responsivo
- **Persistência**: Dados salvos em PostgreSQL
- **Monitoramento**: Kafka UI para visualização
- **Validação**: Formulários com validação TypeScript
- **Estoque Simulado**: Sistema de estoque em memória
- **Logs Detalhados**: Rastreamento completo do fluxo

---

## 🐛 Troubleshooting

### Problemas Comuns

**1. Erro de conexão com Kafka**
```bash
# Verificar se Kafka está rodando
docker-compose ps
# Reinicar se necessário
docker-compose restart
```

**2. Erro de CORS no Frontend**
- Verificar se `CorsConfig.java` está configurado no Order Service
- Confirmar se Angular está rodando na porta 4200

**3. Erro de banco de dados**
```bash
# Verificar conexão PostgreSQL
psql -U postgres -h localhost -d postgres
```

**4. Porta já em uso**
```bash
# Verificar processos rodando nas portas
netstat -ano | findstr :8081
# Matar processo se necessário
taskkill /PID [PID_NUMBER] /F
```

---

## 📚 Documentação Adicional

### Endpoints da API

#### Order Service (8081)
- `POST /orders` - Criar novo pedido
- `GET /orders/health` - Health check

#### Inventory Service (8082)
- `GET /inventory/stock` - Consultar estoque atual
- `POST /inventory/add-stock` - Adicionar estoque
- `GET /inventory/health` - Health check

### Configurações do Kafka
- **Bootstrap Servers**: localhost:9092
- **Partições**: 3 por tópico
- **Replication Factor**: 1 (desenvolvimento)
- **Auto Offset Reset**: earliest

---

## 🎯 Considerações de Produção

Para ambiente de produção, seria necessário:

1. **Segurança**: SSL/TLS, autenticação SASL, ACLs
2. **Alta Disponibilidade**: Cluster Kafka com 3+ brokers
3. **Monitoramento**: Prometheus + Grafana
4. **Persistência**: Banco de dados replicado
5. **Load Balancer**: Para distribuição de carga
6. **Logs Centralizados**: ELK Stack
7. **Container Orchestration**: Kubernetes

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verificar logs dos serviços
- Consultar Kafka UI (http://localhost:8080)
- Validar configurações no application.properties

---

**Sistema desenvolvido para a disciplina de Software Concorrente e Distribuído**  
**Professor: ELIAS BATISTA FERREIRA**  
**Curso: Bacharelado em Engenharia de Software**