# Event Ingestion Platform (API → Queue → Worker)

This project is the first part of a 3-project ARC focused on building a production-style backend system.

The goal of this project is to build a **real event-driven ingestion pipeline** where incoming requests are accepted quickly, queued asynchronously, and processed safely in the background.

---

## ✅ What This Project Does

* Accepts incoming events via an HTTP API
* Validates event structure at the boundary
* Publishes events into a message queue (RabbitMQ)
* Processes events asynchronously using a worker service
* Prevents duplicate processing using Redis idempotency

This mirrors how large-scale systems handle high traffic reliably.

---

## 🏗 Architecture

```
Client
  ↓
Ingestion API (NestJS)
  ↓
RabbitMQ Queue (events.ingest)
  ↓
Worker Service (NestJS Consumer)
  ↓
Redis (Idempotency Check)
```

---

## 📌 Core Concepts Implemented

### 1. Async Event Ingestion

The API responds immediately with **202 Accepted**, without doing heavy work.

### 2. Message Queue Decoupling

RabbitMQ acts as a buffer so spikes in traffic do not crash the system.

### 3. Worker-Based Processing

A separate worker consumes events from the queue and processes them.

### 4. Idempotency with Redis

RabbitMQ may deliver messages more than once.

To prevent duplicates, the worker checks Redis:

* If `processed:{event_id}` exists → skip
* Otherwise → process and mark as processed

---

## 🧾 Event Schema

Example event payload:

```json
{
  "event_id": "evt_001",
  "type": "GRIEVANCE",
  "timestamp": "2026-02-03T12:30:00Z",
  "payload": {
    "message": "Water issue"
  }
}
```

---

## ⚙️ Tech Stack

* **TypeScript + NestJS** (API + Worker)
* **RabbitMQ** (Message Queue)
* **Redis** (Idempotency)
* **Docker Compose** (Local Infrastructure)

---

## ▶️ Running Locally

### 1. Start Infrastructure

```bash
docker compose up -d
```

RabbitMQ UI:

* [http://localhost:15672](http://localhost:15672)
* Login: `guest / guest`

---

### 2. Run Ingestion API

```bash
cd ingestion-service
npm run start:dev
```

---

### 3. Run Worker Service

```bash
cd worker-service
npm run start:dev
```

---

## 🧪 Testing

Send a valid event:

```powershell
$body = @{ event_id="evt_001"; type="GRIEVANCE"; timestamp="2026-02-03T12:30:00Z"; payload=@{ message="Water issue" } } | ConvertTo-Json -Depth 5;
Invoke-WebRequest -Uri "http://localhost:3000/events" -Method POST -Headers @{ "Content-Type"="application/json" } -Body $body
```

Expected:

* API returns **202 Accepted**
* Worker prints processing log

Sending the same event twice:

* First time → processed
* Second time → skipped as duplicate

---

## 🚀 Future Improvements (Planned Enhancements)

This workflow establishes the core event-driven ingestion backbone.
To make the system more production-complete, the following upgrades are planned:

### Dead Letter Queue (DLQ)

* Add a dedicated failure queue (e.g., `events.dlq`) for messages that fail repeatedly.
* Prevent event loss during processing errors.
* Enable safer debugging and replay of failed events.

### Retry + Backoff Strategy

* Introduce controlled retries with exponential backoff before pushing to DLQ.

### Monitoring & Metrics

* Add structured metrics for:

  * queue depth
  * processing latency
  * failure rate

### PostgreSQL Indexing + Optimization

* Improve query performance for high event volume workloads.

### Deployment Hardening

* Containerize both services with production configs.
* Add CI checks and automated testing.

---
