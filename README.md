# Pichupido

Pichupido system - it is web application that will help restaurant create their 
own page with unique design, menu, order system, 
possibility to pay online, call a waiter and feedback system.

In the system will be 4 roles: superadmin, restaurant admin, customer, staff

Feature 0: login

Feature 1: simple flow to manage restaurants in the system (for a superadmin)

Feature 2: simple flow to manage restaurant (for a restaurant admin)

Limitation:
* only Ukraine
* dozens of restaurants
* hundreds of customers



Feature 0: login

    As a staff which has predefined credentials I want to be able to login so that I can see new order
    As a superadmin which has predefined credentials I want to be able to login so that I can add new restaurant in the system
    As a restaurant admin which has predefined credentials I want to be able to login so that I can invite new staff to the restaurant
    
Feature 1: simple flow to manage restaurants in the system (for a superadmin)

    As a superadmin I want to be able to add new restaurant in db

    Acceptance criteria
    City in address fields should be autocomplete fields with list of addresses
    Email to restaurant admin will be send after added restaurant in db
    
    As a superadmin I want to be able to delete restaurant from db

    Acceptance criteria
    Email must be sended to restaurant admin two days before removal

    As a superadmin I want to be able to see orders statistics

    Acceptance criteria
    Order statistics must includes filter by date and restaurants
    
    (Nice to have) As a superadmin I want to be able to block restaurant but not delete
    Acceptance criteria
    Email must be sended to restaurant admin that notify about blocked restaurant.
    
Feature 2: simple flow to manage restaurant (for a restaurant admin)

    As a restaurant admin I want to be able to manage staff (CRUD functinality)
    
    Acceptance criteria
    Email to staff will be send after added their in the system
    
    As a restaurant admin I want to be able to see orders statistics
    
    Acceptance criteria
    Order statistics must includes filter by date
    
    As a restaurant admin I want to be able to create menu
            
    Acceptance criteria
    Restaurant can have few versions of menu but only one active.
    
    As a restaurant admin I want to be able to generate QR-code for each table separately 
            
    As a restaurant admin I want to be able to manage orders (accept, cancel)                         
    
Wireframes: https://www.figma.com/file/F6p99BkLdwmAFRdPSFJcbK/Wireframing-in-Figma?node-id=0%3A817
