<h1 align="center">Synergy Academy Fsw Challenge 6</h1>
  
The Car Management Dashboard API is a powerful interface specifically designed to handle and oversee car rental information. As the sixth challenge in Synergy Academy Batch 6's Full Stack Web JavaScript, this API serves as the backbone for effectively managing various aspects of car rental operations.

This API offers a comprehensive set of functions, which make it possible to perform tasks such as adding new cars into the system, updating the details of existing vehicles, tracking rental history, managing availability status, and creating insightful reports. The API is designed to simplify the workflow for both administrators and users, providing a seamless experience in handling diverse car rental data.

> Base url of this service is: http://localhost:8000

## Getting Started

These instructions will make a copy of the project run on your local machine for development and testing purposes.

First, you will need to clone this project or download the

<pre>
git clone https://github.com/arisafriyanto/fsw-challnge-6.git
cd fsw-challnge-6</pre>

Install dependencies

<pre>npm install</pre>

Next, configure the database configuration in the knexfile.js file and in the /config/database folder

Run the migration to create a database on your local database

<pre>npx knex migrate:latest</pre>

Run the command below to populate the initial data in your database

<pre>npx knex seed:run</pre>

And run in local

<pre>npm run dev</pre>

## Notes
### Super Admin Account
<p>Username: superfranky</p>
<p>Password: superfranky</p>

## API Documentation

This API uses Postman for testing.
You can run the Postman documentation [here](https://documenter.getpostman.com/view/13002679/2s9YeD7YUk#92ffd07d-21cb-4353-9069-092613387896)
