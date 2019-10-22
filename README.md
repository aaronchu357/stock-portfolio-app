# Simple Stock Portfolio README
## [Live Link](https://simple-stock-portfolio-app.herokuapp.com)

## Information
The root of this directory house all files for the server and the client. For the frontend code: `cd frontend`.

## Setup
If you want to run this on your local environment be sure to already have postgresql installed and run:
`bundle install`, then `rails db:create`, then `rails db:migrate`, and finally `rails s`.

It will then start your server on http://localhost:3000/.
To check routes, enter in your terminal: `rails routes`.

To start the client(frontend), `cd frontend`, then run: `npm install`, then `npm start`.

## Technologies Used
- Ruby on Rails backend with PostgreSQL database
- React frontend
- JWT/BCrypt
- Fast JSON Api
- React-Router
- Alphaadvantage Stock API

### Features
- Upon registering, you receive a starting balance of 5000USD.
- To purchase stock, input the desired stock symbol and the number of shares into the form.
  - The price of the stock is based on realtime data
- Able to see the status of your stock(profited or not based on purchase price and current price)
- Able to view a list of past transactions on the transactions page
