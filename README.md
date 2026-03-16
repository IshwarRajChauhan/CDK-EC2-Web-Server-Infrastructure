#  EC2 Web Server Deployment using AWS CDK (TypeScript)

##  Project Overview

This project demonstrates how to deploy a simple web server infrastructure on AWS using **AWS CDK (TypeScript)**.

The stack provisions a complete environment that includes a **custom VPC, Security Group, and EC2 instance**. When the EC2 instance launches, a **User Data script automatically installs Apache HTTP Server and hosts a simple webpage.**

This project demonstrates how **Infrastructure as Code (IaC)** can be used to automate AWS resource provisioning using AWS CDK.

---

# Architecture

Resources provisioned:

- Amazon VPC
- Public Subnet
- Security Group allowing HTTP traffic
- Amazon EC2 Instance (t3.micro)
- User Data Script to install Apache Web Server

---

#  Deployment Flow

CDK Deployment  
↓  
CloudFormation Stack  
↓  
VPC Created  
↓  
Security Group Configured  
↓  
EC2 Instance Launched  
↓  
User Data Script Executes  
↓  
Apache Installed  
↓  
Web Server Running

---

#  Project Structure

This repository contains the AWS CDK infrastructure code required to deploy the web server.

```
project-root/

├── bin/
│   └── webserver.ts
│
├── lib/
│   ├── webserver-stack.ts
│   └── userdata.sh
│
└── README.md
```

### Folder Description

**bin/**  
Contains the entry point of the CDK application.

**lib/**  
Contains the infrastructure stack and EC2 configuration.

**userdata.sh**  
A shell script executed during EC2 instance launch that installs and starts the Apache web server.

---

#  Web Server Setup

The EC2 instance runs a User Data script that performs the following tasks automatically:

- Updates the instance
- Installs Apache HTTP Server
- Starts and enables Apache service
- Creates a simple HTML page

The webpage displays:

```
Hello from AWS with Chauhan
```

---

#  Deployment Guide

## 🔹 Step 1: Create CDK App

```
cdk init app --language typescript
```

---

## 🔹 Step 2: Copy Project Files

After running the `cdk init` command:

Copy the following files into your project.

Copy `webserver.ts` into:

```
bin/
```

Copy `webserver-stack.ts` into:

```
lib/
```

Copy `userdata.sh` into:

```
lib/
```

Your final structure should look like:

```
bin/
  └── webserver.ts

lib/
  ├── webserver-stack.ts
  └── userdata.sh
```

---

## 🔹 Step 3: Install Dependencies

```
npm install aws-cdk-lib constructs
```

---

## 🔹 Step 4: Bootstrap CDK (First Time Only)

```
cdk bootstrap
```

---

## 🔹 Step 5: Synthesize CloudFormation Template

```
cdk synth
```

---

## 🔹 Step 6: Deploy the Stack

```
cdk deploy
```

Confirm the deployment when prompted.

After deployment:

- A VPC will be created
- A Security Group will be configured
- An EC2 instance will launch
- Apache web server will be installed automatically

---

#  Testing

After deployment:

1. Go to the **EC2 Console**
2. Find the created instance
3. Copy the **Public IPv4 Address**
4. Paste it into your browser

Example:

```
http://<EC2-Public-IP>
```

If everything is configured correctly, the browser will display:

```
Hello from AWS with Chauhan
```

---

#  Destroy Stack (Clean Up)

To remove all deployed resources:

```
cdk destroy
```

---

#  Learning Outcomes

This project demonstrates:

- Infrastructure as Code using AWS CDK
- Creating a custom VPC
- Launching EC2 instances using CDK
- Configuring Security Groups
- Automating server setup with EC2 User Data
- Deploying cloud infrastructure programmatically

---
