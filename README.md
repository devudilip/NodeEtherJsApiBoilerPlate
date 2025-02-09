# Express TypeScript API

This project is an Express.js API built with TypeScript, designed to interact with the Ethereum blockchain using ethers.js. It includes features like logging, error handling, and a structured project layout.

## Project Structure

- **src/**: Contains the main source code for the API.
  - **controllers/**: Handles requests and responses.
  - **services/**: Business logic and interaction with external services like Ethereum.
  - **routes/**: Defines the API endpoints and maps them to controllers.
  - **middleware/**: Custom middleware for logging, error handling, etc.
  - **utils/**: Utility functions and configurations.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NodeEtherJsApiBoilerPlate 
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```plaintext
   NODE_ENV=development
   PORT=3000
   ETH_NETWORK=mainnet
   INFURA_PROJECT_ID=your-infura-project-id
   ```

### Running the Application

To start the application in development mode:
```bash
npm run dev
```

To build and start the application in production mode:
```bash
npm run build
npm start
```

## Modifying the Project

### Adding a New Endpoint

1. Create a new controller in `src/controllers/`.
2. Define the business logic in `src/services/` if needed.
3. Add a new route in `src/routes/` and map it to the new controller.

### Adding Middleware

1. Create a new middleware function in `src/middleware/`.
2. Register the middleware in `src/index.ts`.

## Testing

This project uses Jest for testing.

### Adding Test Cases

1. Install Jest and related dependencies:
   ```bash
   npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
   ```

2. Create test files in the `src/__tests__/` directory.
3. Write your test cases using Jest syntax.
4. Run tests with:
   ```bash
   npm test
   ```

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
