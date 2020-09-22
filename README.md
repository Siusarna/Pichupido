# Pichupido

Pichupido system - it is web application that will help restaurant create their 
own page with unique design, menu, order system, 
possibility to pay online, call a waiter and feedback system.

In the system will be 4 roles: superadmin, restaurant admin, customer, staff

Feature 0: login

Feature 1: simple flow to manage restaurants in the system (for a superadmin)

Feature 2: simple flow to manage restaurant (for a restaurant admin)

Feature 3: simple flow to make an order (for a restaurant customer)

Limitation:
* only Ukraine
* dozens of restaurants
* hundreds of customers



Feature 0: login

    As a staff which has predefined credentials I want to be able to login so that I can see new order
    As a superadmin which has predefined credentials I want to be able to login so that I can add new restaurant in the system
    As a restaurant admin which has predefined credentials I want to be able to login so that I can invite new staff to the restaurant
    
Feature 1: simple flow to manage restaurants in the system (for a superadmin)

    As a superadmin I want to be able to add new restaurant in db so that they can use our service

    Acceptance criteria
    City in address fields should be autocomplete fields with list of addresses
    Email to restaurant admin will be send after added restaurant in db
    
    As a superadmin I want to be able to delete restaurant from db that they can't use our service

    Acceptance criteria
    Email must be sended to restaurant admin two days before removal
    
    (Nice to have) As a superadmin I want to be able to block restaurant but not delete so that thay temporarily can't use our service 
    Acceptance criteria
    Email must be sended to restaurant admin that notify about blocked restaurant.
    
Feature 2: simple flow to manage restaurant (for a restaurant admin)

    As a restaurant admin I want to be able to manage staff (CRUD functinality) so that I can control who uses this sevice
    
    Acceptance criteria
    Email to staff will be send after added their in the system
    
    As a restaurant admin I want to be able to see orders statistics so that I can analyse them and make decisions based on them
    
    Acceptance criteria
    Order statistics must includes filter by date
    
    As a restaurant admin I want to be able to create menu so that our customers can see menu and make orders
            
    Acceptance criteria
    Restaurant can have few versions of menu but only one active.
    
    As a restaurant admin I want to be able to generate QR-code for each table separately so that our users can access this service
            
    As a restaurant admin I want to be able to manage orders (accept, cancel) so that we can fulfill orders and get money

    (Nice to have) As a restaurant admin I want to have understandable visual representation of current status of tables so that we can manage restaurant more effectively

Feature 3: simple flow to make an order (for a restaurant customer)

    As customer I want to be able to see restaurant menu without social contact so that I can decide what to order and don't get sick

    As customer I want to be able to make an order for it without social contact so that I can eat and don't get sick

    As customer I want to be able to pay for an order with cash so that I can get my food

    (Nice to have) As customer I want to be able to pay for an order online with this app so that I can get my food

    As customer I want to be able to call a waiter so that I can solve problems which need waiter intervention
    
Wireframes: https://www.figma.com/file/F6p99BkLdwmAFRdPSFJcbK/Wireframing-in-Figma?node-id=0%3A817

#Technical stack:
  ##Backend:
  * TypeScript
  * Koa | Nest | Fastify
  * PostgreSQL
  * TypeORM
  * Jest
  * Stripe
  * Swagger
  * REST API
  
  ##Frontend:
  * TypeScript
  * Vue
  * HTML5
  * CSS3
  * Axios
  * Stripe
  
  ##Deploy:
  * CircleCI
  * Docker
  * Kubernetes
  * LetsEncrypt
  
  ##Web application architecture
  ![GitHub Logo](/img/Screenshot_12.jpg)
