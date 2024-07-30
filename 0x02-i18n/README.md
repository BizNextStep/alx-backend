# Basic Flask App with Babel, URL-based Locale Selection, and Mock Login

This project contains a basic Flask app with Babel for i18n support, locale selection with URL parameter, template parameterization, and mock user login.

## How to Run

1. Install Flask and Flask-Babel:
    ```sh
    pip install Flask flask_babel==2.0.0
    ```

2. Run the app:
    ```sh
    ./5-app.py
    ```

3. Open your browser and go to:
    - `http://127.0.0.1:5000?locale=en` or `http://127.0.0.1:5000?locale=fr` to see the translated messages.
    - `http://127.0.0.1:5000/?login_as=2` to see the mock login message.

