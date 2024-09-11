# AlphaTribe Assignment

A simple nodejs web server using express. The project uses clean architecture concepts, more on that below.

## Run Locally

Clone the project

```bash
  git clone https://github.com/harisanker10/alphatribe-assignment
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Create .env file and populate all the fields

```bash
  mv .env.example .env
```

Start the server

```bash
  npm run start
```

## Overview

This project utilizes clean architecture and adheres to strong SOLID principles. A great article for further exploration is provided below:

Clean Architecture by Robert C. Martin emphasizes separation of concerns in software design. This is achieved by dividing the application into distinct layers, each encapsulated by a higher-level layer. The way these layers communicate follows the Dependency Rule.

Dependency Rule: Inner layers (core business logic) are intentionally kept ignorant of the outer layers (infrastructure and frameworks). Dependencies for the inner layers are provided (flown in) from the outer layers.

Project Layers

- Entities: These are the data models representing business concepts with persistence capabilities.

- Use Cases: This layer focuses solely on business logic. Code written here deals exclusively with business rules and remains agnostic to external details like how user IDs are retrieved (query parameters, authorization headers, etc.). Use cases define rules, accept specific values, and return relevant data based on business requirements.

- Controllers/Adapters: These functions manage interactions with the outside world and format data for use cases. They gather data from sources like request bodies, queries, headers, and pass it on to the use case layer.

- Framework: This layer encapsulates the application's framework specifics. Everything here deals with data and configuration. Technologies used for setting up the server, database, etc., are configured here and provided as dependencies to inner layers. This ensures the inner layers have no direct dependencies and rely solely on injected dependencies.

This approach ensures that changes in one layer, like the business logic, have minimal impact on others. The business layer defines clear contracts (interfaces) that the framework layer implements and injects. This loose coupling allows for easy replacement of framework components. For example, in this project, use cases define interfaces for repositories that the framework implements using MongoDB. Switching to PostgreSQL would simply require implementing a new repository that fulfills the same contract defined by the use cases.

Adherence to these practices fosters maintainability and flexibility in the long term. This document outlines my learnings from applying clean architecture and SOLID principles in this project. Feel free to open issues or provide constructive criticism highlighting potential areas for improvement.

## Documentation

[API Documentation (Postman)](https://documenter.getpostman.com/view/29107640/2sAXqmB5ZL)

[Project Spec](https://docs.google.com/document/d/1NZshuJCvWB3s0Y5EbD5ZVeadqxNTi6KDJuJ6UVcGCzY/edit)

## Acknowledgements

- [https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive/)](https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive/)

## Features

- E2E Testing with Jest and Supertest
- Clean architecure
- Fully typesafe using typescript
