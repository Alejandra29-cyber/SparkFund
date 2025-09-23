# SparkFund
The objective of this project is to develop a customizable donation platform that enables micropayments while eliminating transaction fees. This will empower individuals to contribute according to their capacity

### WHAT IS THE PROBLEM?

People affected by situations beyond their control are left vulnerable and rely on external aid to cover medical supplies.
Cash donations carry handling risks, and online fundraisers incur costs due to payment gateway fees.

### WHAT IS THE SOLUTION

Our proposed solution is to implement the *Open Payments API* to create a website dedicated to donations, customizable according to each campaign, which **reduces or eliminates fees**, and also facilitates *micropayments* so empathetic individuals can donate amounts according to their means.

### WHAT ARE THE BENEFITS?

- Facilitates small donations (micropayments)
- Reduces or eliminates transaction fees  
- Removes the need to use payment gateways  
- Reduces the risk of bank data theft  
- Simplifies the user experience by only requiring wallet input, amount entry, and transaction confirmation  
- Accessible for different economic capacities  
- Eliminates issues related to currency exchange  

### Value Proposition

- *For the Donor:* Donate without feeling the expense, and be an active part of the solution. Your money has a visible impact, and you choose where it goes.  
- *For NGOs:* Receive a steady and predictable flow of income from a new generation of donors who feel more engaged than ever.  
- *For the Business:* Create a financial and social ecosystem that links philanthropy with financial services.

## HIGH-LEVEL TECHNICAL SOLUTION DESCRIPTION

**The solution consists of developing a web donation platform customizable by campaign, integrated with the Open Payments API, to allow easy donations, micropayments, and fee reduction. The architecture is proposed as a *client-server model* with scalable and secure components.**

### 1. FRONTEND  
*Technology:* React.js  
*Functionality:* Campaign and donation form visualization

### 2. BACKEND  
*Technology:* Node.js with Express  
*Functionality:*  
- User management  
- Open Payments integration  
- Transaction logging

### 3. DATABASE  
*Technology:* MySQL  
*Functionality:*  
- Storage of users, campaigns, and donations

### 4. INFRASTRUCTURE  
*Technology:* WAMPSERVER  
*Functionality:*  
- Local web development infrastructure

## FEASIBILITY, IMPACT & SUSTAINTABILITY ANALYSYS

### Feasibility

- *Potential Market:* Over 80% of the population in Mexico City has access to a smartphone, and 50% make online purchases, ensuring a user base familiar with digital transactions.  
- *Transaction Cost:* This is where Interledger shines. Transaction costs are significantly lower than gateways like Stripe or Openpay, making micro-donations of $5 or $10 pesos economically viable and profitable for the business. The issue of high percentage fees on small amounts is eliminated.  
- *Acceptance and Trust:* Although Interledger is less known to end users, the platform interface will generate trust, not the underlying technology.

### Impact

- *Social Impact:* An inclusive donation culture would be promoted, allowing more people to contribute. Interledger technology makes every peso count, increasing the impact of collective donations.  
- *User Economic Impact:* Micropayments remain key. The amount is so small that it does not affect the user's finances, while the emotional impact of actively participating in a cause is significant.

### Sustainability

- *Financial Sustainability:* The business model becomes more profitable thanks to Interledger's low costs. Revenue would come from a small commission on each micro-transfer, corporate sponsorships, and the platform's ability to attract and retain users at scale.

## TEAM FORMATION

### Osiris – UX Lead & Feasibility/Impact Analyst

*Description:* UX specialist with a strong background in business analysis and sustainability.  
*Key Responsibilities:*  
- UX research and design for optimized donation flows  
- Technical and economic feasibility analysis  
- Impact evaluation and sustainability metrics  
- Usability testing and validation with end users  
- Definition of KPIs and strategic dashboards

### Alejandra – Project Lead & Database Architect

*Description:* Technical leader specialized in data architecture and project management.  
*Key Responsibilities:*  
- Team leadership and deliverable coordination  
- PostgreSQL database architecture and optimization  
- Development of analytical dashboards for business metrics  
- Data infrastructure management and reporting  
- Coordination with Osiris on impact metrics definition

### Alan – Back-End Developer & Open Payments Specialist

*Description:* Back-end developer with expertise in payment system integrations.  
*Key Responsibilities:*  
- Integration with Open Payments APIs and banks  
- Development of microservices for transaction processing  
- Implementation of banking security and authentication  
- API optimization for high performance  
- Technical documentation of integrations

### Pamela – Front-End Developer & UI Specialist

*Description:* Front-end developer focused on optimized interfaces and visual experience.  
*Key Responsibilities:*  
- Front-end development with React/Next.js  
- Implementation of responsive and accessible interfaces  
- Interactive prototyping and usability testing  
- Front-end performance optimization  
- Collaboration with Osiris on UX research implementation

## TECH STACK DETAILS

### BACKEND: Node.js (JavaScript)  
- *Fast development:* Wide NPM package ecosystem  
- *Horizontal scalability:* Event-driven architecture  
- *Open Payments:* Native compatibility with payment APIs

### DATABASE: MySQL  
- *ACID transactions:* Secure financial operations  
- *High performance:* Optimized for fast reads/writes  
- *Replication:* Horizontal scalability with read replicas

### FRONTEND: React.js  
- *Reusable components:* Agile and maintainable development  
- *Predictable state:* Consistent application state management  
- *Virtual DOM:* High performance in dynamic interfaces

## Key Benefits

### - *Cohesion:* RESTful APIs between React and Node.js  
### - *Scalability:* Each layer scales independently  
### - *Maintainability:* Modular code and separation of concerns  
### - *Ecosystem:* Extensive documentation and community support



## ESSENTIAL FEATURES

## 📂 Project Stack

```t
SparkFun/
├── backend/ ⚙️ # Servidor Backend
│ ├── config/ 🛠️ # Configuración (DB, variables, etc.)
│ ├── controllers/ 📌 # Controladores de la lógica de negocio
│ ├── routes/ 🌐 # Definición de endpoints
│ ├── .env 🔑 # Variables de entorno del backend
│ ├── private.key 🔐 # Clave privada (JWT u otros usos)
│ └── server.js 🚀 # Punto de entrada del servidor
│
├── frontend/ 💻 # Servidor Frontend (React)
│ └── src/
│ ├── components/ 🧩 # Componentes reutilizables
│ ├── pages/ 📄 # Vistas principales
│ ├── services/ 🔗 # Llamadas a la API
│ ├── styles/ 🎨 # Estilos globales
│ ├── utils/ 🧰 # Funciones auxiliares
│ ├── App.js ⚛️ # Componente raíz
│ └── index.js 🎯 # Entrada de React
│
├── .env 🌍 # Variables de entorno globales
├── package.json 📦 # Dependencias y scripts del proyecto
└── README.md 📝 # Documentación del proyecto