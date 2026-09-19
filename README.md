# Intelligent IT Helpdesk

An end-to-end AI workflow automation prototype that transforms unstructured employee IT requests into categorized, prioritized, and routed workflows using React, Google Gemini, and n8n.

I built and presented this prototype as part of a technical marketing interview project for Cloudflare. The goal was to demonstrate not only how an AI-powered workflow could work technically, but how it could solve a real operational problem for IT administrators.

## The Problem

IT service desks receive unstructured requests covering everything from password resets and VPN problems to hardware failures and security incidents.

Before someone can act on those requests, they often need to be manually:

- understood
- categorized
- prioritized
- routed to the correct team

The problem I wanted to explore was how AI could reduce this repetitive triage work without giving a model unrestricted control over downstream actions.

## What I Built

I built a web-based IT service desk connected to an AI-powered n8n workflow.

The system takes an unstructured employee request and turns it into a structured workflow result containing information such as:

- ticket category
- priority
- summary
- routing reason
- assigned team
- recommended action

The frontend provides the interface for submitting requests and viewing results, while n8n orchestrates the classification and routing workflow.

## Architecture

**React Helpdesk → HTTP POST → n8n Webhook → Validation → Gemini Classification → Structured JSON → Deterministic Routing → Dashboard Response**

### Workflow

1. **Receive**
   - The React interface sends an IT request to an n8n webhook through an HTTP POST request.

2. **Validate**
   - Required fields are checked before the request reaches the model.

3. **Classify**
   - Google Gemini interprets the ticket subject and description.

4. **Structure**
   - The model returns constrained structured output including category, priority, summary, and reasoning.

5. **Route**
   - n8n uses deterministic workflow logic to route the ticket to one of five predefined operational paths.

6. **Respond**
   - The assigned team and resulting action are returned to the web interface.

## Design Decision: AI Interprets, Workflow Logic Controls

One of the main decisions I made was to separate AI interpretation from operational control.

The model is useful for understanding unstructured language, but routing does not need to be an open-ended AI decision. Instead, the model converts the request into structured information and deterministic workflow logic controls what happens next.

This makes the workflow easier to understand, test, and extend while keeping operational rules explicit.

## Ticket Routing

The prototype supports five representative IT service desk categories:

| Category | Example Issues | Routed Team |
| --- | --- | --- |
| Identity & Access | Passwords, MFA, permissions | Identity & Access Management |
| Network & Connectivity | VPN, Wi-Fi, DNS, latency | Network Operations |
| Hardware & Device | Laptops, monitors, cameras | Endpoint Support |
| Application & Software | App crashes, installation, configuration | Application Support |
| Security Incident | Phishing, malware, credential risk | Security Operations Center |

A security incident, for example, can be identified as critical and routed for immediate security escalation.

## Reliability & Safety

I also designed the prototype around several safeguards that would matter when extending this pattern beyond a demo:

- **Input validation** prevents incomplete requests from reaching the model.
- **Structured outputs** constrain model responses to expected fields.
- **Deterministic routing** keeps operational policy outside free-form model output.
- **Execution visibility** makes workflow inputs, outputs, and failures inspectable.
- **Human review** can be introduced for sensitive or ambiguous cases.

The demo also included a controlled failure path: a request with a blank description fails validation before an AI call is made.

## Why n8n?

I used n8n as the orchestration layer because it made it possible to connect webhooks, APIs, AI calls, validation, branching, and responses in one visible workflow.

This also made the boundary between AI reasoning and deterministic application logic easier to inspect and iterate on.

## Tech Stack

- **Frontend:** React, Vite
- **Workflow Orchestration:** n8n
- **AI:** Google Gemini
- **Integration:** HTTP, Webhooks
- **Data:** JSON / structured model output

## What I Learned

This project helped me explore how AI can be incorporated into a product without making every part of the system AI-driven.

The most useful pattern was using AI where interpretation adds value while keeping predictable business logic deterministic. It also reinforced the importance of designing AI prototypes around the full user workflow — not just the model call — including validation, routing, failure handling, and the experience presented back to the user.

## Repository Scope

This repository contains the React/Vite frontend used for the prototype.

The n8n workflow and AI orchestration layer were built separately and are described here to document the end-to-end system architecture. The project was developed as a prototype rather than a production deployment.
