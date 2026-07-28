# Getting Started

Welcome to SmartTable! This guide will help you get started quickly.

## System Requirements

- Node.js 18+
- pnpm 9+

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/my-Smart-Table/smart-table-spec.git
cd smart-table-spec
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

```bash
cp smart-table/.env.example smart-table/.env
```

Edit the `.env` file and configure the necessary environment variables.

### 4. Initialize Database

```bash
cd smart-table
pnpm db:init
```

### 5. Start Development Server

```bash
pnpm dev
```

### 6. Access the Application

Open your browser and visit `http://localhost:5173`

## Next Steps

- [Table Operations](/en-US/user-guide/table-operations)
- [View Management](/en-US/user-guide/views/table-view)
- [Field Types](/en-US/user-guide/field-types)
