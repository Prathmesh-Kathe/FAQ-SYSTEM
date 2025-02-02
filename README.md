# FAQ API

A multilingual FAQ management system built with Node.js, Express, and MongoDB. The API supports automatic translation of FAQs into multiple languages using Google Translate API.

## Features

- Create and manage FAQs with automatic translations
- Support for multiple languages (English, Hindi, Bengali)
- Admin dashboard for FAQ management
- RESTful API endpoints
- MongoDB integration for data persistence

## Prerequisites

- Node.js 16 or higher
- MongoDB database
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd faq-api
```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## API Usage

### Get All FAQs

- **Endpoint:** `GET /api/faqs`
- **Description:** Fetch all FAQs in the default language (English).
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "faq_id",
        "question": "What is Node?",
        "answer": "A JavaScript runtime."
      }
    ]
  }
  ```

### Get FAQs in a Specific Language

- **Endpoint:** `GET /api/faqs?lang=hi`
- **Description:** Fetch all FAQs in the specified language (e.g., Hindi).
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "faq_id",
        "question": "Node क्या है?",
        "answer": "एक जावास्क्रिप्ट रनटाइम।"
      }
    ]
  }
  ```

### Create a New FAQ

- **Endpoint:** `POST /api/faqs`
- **Description:** Create a new FAQ with translations.
- **Request Body:**
  ```json
  {
    "question": "What is Express?",
    "answer": "A web application framework for Node.js."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "new_faq_id",
      "question": "What is Express?",
      "answer": "A web application framework for Node.js.",
      "translations": {
        "hi": "Express क्या है?",
        "hi_answer": "Node.js के लिए एक वेब एप्लिकेशन फ्रेमवर्क।",
        "bn": "Express কি?",
        "bn_answer": "Node.js এর জন্য একটি ওয়েব অ্যাপ্লিকেশন ফ্রেমওয়ার্ক।"
      }
    }
  }
  ```

## Contribution Guidelines

We welcome contributions to improve this project. Please follow these guidelines:

1. **Fork the repository:**
   Click the "Fork" button on the top right of the repository page.

2. **Clone your forked repository:**
   ```bash
   git clone https://github.com/your-username/faq-api.git
   cd faq-api
   ```

3. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes:**
   Implement your feature or bug fix.

5. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

6. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**
   Go to the original repository and click the "New Pull Request" button.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue or contact the repository owner.
