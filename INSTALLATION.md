# MayarClone Installation Guide

This document provides detailed instructions for setting up and running the MayarClone digital marketplace on your local development environment.

## Prerequisites

Before you begin the installation process, make sure you have the following requirements installed on your system:

- **PHP 8.2** or higher
- **Composer** (PHP dependency manager)
- **Node.js** and npm or yarn
- **MySQL** or another database system supported by Laravel

## Step-by-Step Installation

Follow these steps to install and configure the MayarClone application:

### 1. Clone the Repository

```bash
git clone https://github.com/humamafif/mayar-clone.git
cd mayar-clone
```

### 2. Install PHP Dependencies

Use Composer to install all required PHP packages:

```bash
composer install
```

### 3. Install JavaScript Dependencies

Install the required frontend dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 4. Configure Environment

Create and set up the environment file:

```bash
cp .env.example .env
php artisan key:generate
```

Open the `.env` file in your text editor and configure the following:

### 5. Configure Database Connection

Set up the database connection in your `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mayarclone
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Make sure to create the database in MySQL before running the migrations.

### 6. Configure Xendit API Integration

Add your Xendit API credentials to the `.env` file:

```
XENDIT_API_KEY=your_api_key
XENDIT_CALLBACK_TOKEN=your_callback_token
```

You can obtain these credentials by registering at [Xendit](https://www.xendit.co/).

### 7. Migrate the Database

Run the database migrations to set up the necessary tables:

```bash
php artisan migrate
```

### 8. Link Storage Directory

Create a symbolic link from `public/storage` to `storage/app/public` to make uploaded files accessible from the web:

```bash
php artisan storage:link
```

### 9. Compile Frontend Assets

Build the frontend assets:

```bash
npm run build
# or
yarn build
```

For development with hot reload, you can use:

```bash
npm run dev
# or
yarn dev
```

### 10. Start the Application

Launch the development server:

```bash
php artisan serve
```

## Troubleshooting

If you encounter any issues during installation, try the following steps:

1. Clear application cache:

    ```bash
    php artisan cache:clear
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear
    ```

2. If database migrations fail, check your database credentials and ensure the database exists.

## Commit Message Guidelines

For standardized commit messages in this project, please follow the guidelines available at:

[Conventional Commit Messages](https://gist.github.com/rishavpandey43/84665ffe3cea76400d8e5a1ad7133a79)

Following these conventions helps maintain a clean and informative git history that makes it easier to track changes and generate changelogs.
