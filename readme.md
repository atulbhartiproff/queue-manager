# Queue Manager System

A robust event ingestion and queue management system built with NestJS and Kafka for handling high-throughput event processing.

## Overview

The Queue Manager System is designed to efficiently ingest, process, and manage events in real-time. It provides a scalable architecture for event distribution across multiple consumers and handles asynchronous processing with reliability and fault tolerance.

## Features

- **Event Ingestion**: RESTful API for submitting events
- **Kafka Integration**: Built-in Apache Kafka producer/consumer support
- **Asynchronous Processing**: Non-blocking event handling
- **Health Checks**: System health monitoring endpoints
- **Scalability**: Designed for high-throughput scenarios
- **Reliability**: Event persistence and retry mechanisms

## Architecture

The system is composed of:

- **Ingestion Service**: NestJS-based API for event intake
- **Event Producer**: Kafka producer for publishing events
- **Queue Processing**: Asynchronous event processing pipeline
- **Health Monitoring**: Real-time system health checks

## Tech Stack

- **Runtime**: Java 21 LTS (backend), Node.js (NestJS)
- **Framework**: NestJS (TypeScript)
- **Message Queue**: Apache Kafka
- **Build Tools**: Maven, npm

## Project Structure

```
.
├── ingestion-service/          # NestJS Ingestion API
│   ├── src/
│   │   ├── app.controller.ts   # Event endpoints
│   │   ├── app.service.ts      # Business logic
│   │   └── main.ts             # Application entry
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Kafka running locally or accessible

### Installation

```bash
# Install dependencies
cd ingestion-service
npm install
```

### Running the Application

```bash
# Development mode with watch
npm run start:dev

# Production build
npm run build
npm run start:prod
```

### Health Check

```bash
curl http://localhost:3000/health
```

## API Endpoints

### POST /events
Submit a new event for processing

**Request Body:**
```json
{
  "eventType": "string",
  "payload": "object",
  "timestamp": "ISO8601"
}
```

### GET /health
System health status

## Environment Configuration

Create `.env` file in `ingestion-service/`:

```env
KAFKA_BROKER=localhost:9092
KAFKA_TOPIC=events
NODE_ENV=development
```

## Development

### Running Tests

```bash
npm run test
npm run test:e2e
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with descriptive messages
4. Push and create a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.