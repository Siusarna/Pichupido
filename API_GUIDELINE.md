# API design guideline

## Development view
![Development view](/img/development_view.jpg)

## General information
Type of API - REST

Protocol - HTTP

Data format - JSON

## Resources
API must be resourse oriented

So API must be modelled as resource hierarchy, where each node is either a simple resource or a collection resource

Each resource preffered to have these standart methods:
  - Read one 
    - HTTP GET resourses/:id
  - Read list 
    - HTTP GET resourses/
  - Create 
    - HTTP POST resourses/
  - Update 
    - HTTP PUT resourses/:id
  - Delete 
    - HTTP DELETE resourses/

## Resource Names

Nouns must be used in URI

Plurals preffered to be used in URI

Verbs should be used only for non-standard methods (e.g. confirm)

## Versioning

Version is specified in URL: **api/v{version-number}/...**

version-number is number of major version

## Request/Response payload

- Standart error: 
```
{
  error: 'string'
}
```
- GET 
  - Success
    -  Status: 200
    -  Body: object that was requested
  - Error
    - Status: 400
    - Body: standart error
- POST 
  - Success
    -  Status: 201
    -  Body: id of created object
  - Error
    - Status: 400
    - Body: standart error
- PUT
  - Success
    -  Status: 204
    -  Body: none
  - Error
    - Status: 400
    - Body: standart error
- DELETE
  - Success
    -  Status: 204
    -  Body: none
  - Error
    - Status: 400
    - Body: standart error

