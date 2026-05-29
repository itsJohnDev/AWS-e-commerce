# AWS Serverless E-Commerce Platform

A scalable and event-driven e-commerce platform built using AWS serverless technologies and microservice architecture principles. This project leverages Infrastructure as Code (IaC) for reproducible deployments and cloud-native scalability.

---

## Overview

This project demonstrates a serverless e-commerce architecture designed for:

- Scalability through microservices
- Event-driven communication
- Low operational overhead
- Infrastructure automation
- High availability and fault tolerance

The platform uses AWS managed services to handle compute, storage, notifications, and persistence.

---

# Architecture

## Core Technologies

- AWS Lambda
- Amazon S3
- Amazon DynamoDB
- Amazon SNS
- Infrastructure as Code (Serverless Framework)
- Microservice Architecture

## High-Level Components

### Product Service

Responsible for:

- Product management
- Product retrieval
- Inventory updates

### Order Service

Responsible for:

- Order creation
- Order processing
- Order state management

### Notification Service

Responsible for:

- Event broadcasting
- Customer notifications
- Order updates

### File / Asset Service

Responsible for:

- Product image uploads
- Static asset storage
- Media retrieval

---

# AWS Services Used

| Service              | Purpose                                       |
| -------------------- | --------------------------------------------- |
| Lambda               | Backend business logic execution              |
| DynamoDB             | NoSQL database for application data           |
| S3                   | Storage for images and static assets          |
| SNS                  | Event notifications and service communication |
| Serverless Framework | Infrastructure as Code and deployment         |
| API Gateway          | API exposure for client applications          |

---

# Microservice Design

Each service is designed to be:

- Independently deployable
- Loosely coupled
- Event-driven
- Horizontally scalable

Example communication flow:

```text
Client Request
      ↓
API Gateway
      ↓
Lambda Function
      ↓
DynamoDB Update
      ↓
SNS Event Publish
      ↓
Subscriber Services
```

---

# Infrastructure as Code (IaC)

Infrastructure provisioning and deployment are managed using Serverless Framework.

Features:

- Version-controlled infrastructure
- Repeatable deployments
- Environment configuration management
- Simplified rollback capability

---

# Project Structure

```text
project-root/
│
│   ├── authService/
│   ├── bannerService/
│   ├── categoryService/
│   ├── productService/
|
└── README.md
```

---

# Prerequisites

- Node.js
- AWS CLI
- Serverless Framework
- AWS Account with configured credentials

---

# Installation

```bash
git clone <repository-url>
cd project-directory
npm install
aws configure
```

---

# Deployment

```bash
serverless deploy
```

Deploy specific stage:

```bash
serverless deploy --stage dev
```

Remove deployment:

```bash
serverless remove
```

---

# Environment Variables

```env
AWS_REGION=ap-southeast-1
PRODUCT_TABLE=products
ORDER_TABLE=orders
SNS_TOPIC_ARN=<topic-arn>
S3_BUCKET=<bucket-name>
```

---

# Scalability Considerations

- Stateless compute using Lambda
- DynamoDB auto scaling
- Event-driven processing using SNS
- Decoupled microservices
- Pay-per-use infrastructure model

---

# Security Considerations

- IAM least privilege access
- Environment variable management
- Resource-level permissions
- Encryption at rest and in transit

---

# Future Improvements

- Payment integration
- Authentication and authorization
- Monitoring and observability
- CI/CD pipeline integration
- Distributed tracing
- Multi-region deployment

---

# License

This project is intended for educational and portfolio purposes.
