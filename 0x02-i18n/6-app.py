#!/usr/bin/env python3
"""
This module sets up a basic Flask app with Babel for i18n support, locale selection,
template parameterization with support for URL-based locale setting, and mock user login.
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, _

class Config:
    """
    Config class for Flask app.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"

app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

def get_user() -> dict:
    """
    Get user from users dictionary.
    """
    try:
        user_id = int(request.args.get('login_as'))
        return users.get(user_id)
    except (TypeError, ValueError):
        return None

@app.before_request
def before_request():
    """
    Set user as a global on flask.g.user.
    """
    g.user = get_user()

@babel.localeselector
def get_locale():
    """
    Determine the best match with our supported languages.
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/', strict_slashes=False)
def index():
    """
    The index route returns the rendered index.html template.
    """
    return render_template('6-index.html')

if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)

